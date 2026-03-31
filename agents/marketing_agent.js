import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

async function obtenerEmpresas() {
  const { data, error } = await supabase
    .from('empresas')
    .select('*')

  if (error) {
    console.error('Error:', error.message)
    return
  }

  console.log('Empresas en Omega:')
  data.forEach(empresa => {
    console.log(`
    Nombre: ${empresa.nombre}
    Sector: ${empresa.sector}
    Objetivo: ${empresa.objetivo_principal}
    `)
  })
}

obtenerEmpresas()