import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { API_URLS, AI_MODELS, AI_MAX_TOKENS } from '@/lib/config'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { image, mimeType, cropName } = await req.json()
  if (!image || typeof image !== 'string' || !mimeType?.startsWith('image/')) {
    return NextResponse.json({ error: 'Please upload a valid crop image.' }, { status: 400 })
  }

  try {
    const response = await fetch(`${API_URLS.groq}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_MODELS.vision,
        max_tokens: AI_MAX_TOKENS.cropAnalysis,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: { url: `data:${mimeType || 'image/jpeg'};base64,${image}` },
              },
              {
                type: 'text',
                text: `You are an expert agricultural scientist. First check if this image is actually a plant, crop, leaf, or agricultural field.

If it is NOT a crop/plant image, respond with exactly:
{"error":"not_a_crop","message":"Please upload a photo of a crop or plant leaf"}

If it IS a crop/plant image${cropName ? ` of ${cropName}` : ''}, analyze it and respond with ONLY this JSON (no example values — fill in real ones based on what you see):
{"cropType":"the crop plant name you identified e.g. Tomato","disease":"exact disease name or Healthy","confidence":<integer 0-100>,"severity":"Low or Medium or High","urgency":"Monitor or Act today or Urgent","nextAction":"one specific immediate action","healthScore":<integer 0-100>,"treatment":["step 1","step 2","step 3"],"nutrients":[],"summary":"2 sentence summary of what you actually see"}

Safety: do not overstate certainty. If image quality is poor or multiple diseases are plausible, keep confidence at 65 or below and recommend a local agricultural extension worker for confirmation. Do not recommend restricted pesticides; prefer integrated pest management and label-directed use.`,
              },
            ],
          },
        ],
      }),
    })

    const data = await response.json()
    if (data.error) throw new Error(data.error.message)

    const text = data.choices?.[0]?.message?.content ?? ''
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    if (parsed.error === 'not_a_crop') {
      return NextResponse.json({
        cropType: '',
        disease: 'Invalid image',
        confidence: 0,
        severity: 'Unknown',
        urgency: 'Monitor',
        nextAction: 'Upload a clear photo of one affected leaf in daylight.',
        healthScore: 0,
        treatment: ['Please upload a photo of a crop or plant leaf, not a random image'],
        nutrients: [],
        summary: parsed.message,
      })
    }

    return NextResponse.json(parsed)
  } catch (e) {
    return NextResponse.json({
      cropType: '',
      disease: 'Analysis Error',
      confidence: 0,
      severity: 'Unknown',
      urgency: 'Monitor',
      nextAction: 'Retake the photo in daylight, focusing on one affected leaf.',
      healthScore: 0,
      treatment: ['Please try again with a clearer crop photo'],
      nutrients: [],
      summary: 'Could not analyze the image. Please upload a clear photo of a crop or plant.',
    })
  }
}
