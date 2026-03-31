import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

async function generarPlanMarketing() {
  // Javier va al armario
  const { data, error } = await supabase
    .from('empresas')
    .select('*')
    .limit(1)
    .single()

  if (error) {
    console.error('Javier no encontró el abrigo:', error.message)
    return
  }

  console.log(`Javier trajo el abrigo de: ${data.nombre}`)
  console.log('Pasándolo a Cipriano...\n')

  // Javier le habla a Cipriano
  const prompt = `Eres un consultor de marketing para micro-empresas en México.
  
Tu cliente es ${data.nombre}, una empresa del sector ${data.sector}.
Su objetivo principal es: ${data.objetivo_principal}
Tienen presupuesto cero y máximo 15 minutos al día.

Dame exactamente 3 acciones concretas para esta semana.`

  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'qwen2.5:3b',
      prompt: prompt,
      stream: false
    })
  })

  const result = await response.json()
  console.log('Plan de Cipriano:')
  console.log(result.response)
}

generarPlanMarketing()