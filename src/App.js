import { useState } from "react";
import axios from "axios";

function App() {
  
  const api = process.env.REACT_APP_API_URL;

  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);

  const formatarCEP = (valor) => {
    valor = valor.replace(/\D/g, ""); 
    if (valor.length > 5) {
      valor = valor.replace(/(\d{5})(\d{1,3})/, "$1-$2");
    }
    return valor;
  };

    const buscar = async (cepLimpo) => {
    try {
      const response = await axios.get(`${api}/${cepLimpo}/json/`);
      setEndereco(response.data);

      if(response.data.erro){
        alert("CEP não encontado!");
        setEndereco(null);
        return;
      }

    } catch (error) {
      alert("Erro ao buscar o CEP");
      setEndereco(null);
    }
  };

    const resetar = () => {
    setCep("");
    setEndereco(null);
  };

    const handleCepChange = async (e) => {
    const valor = e.target.value;
    const formatado = formatarCEP(valor);
    setCep(formatado);

    const cepNumeros = formatado.replace(/\D/g, "");
    if (cepNumeros.length === 8) {
      await buscar(cepNumeros);
    }
  };


  return(
<>
 
          {!endereco &&(

            <div>
              <div className="Card">
                <div className="Title">
               MeuLocal-ViaCep
                </div>
                <div className="Form">
                  <input className="FormInput"
                    type="text"  
                    name='cep'
                    value={cep} 
                    onChange={handleCepChange}
                    id='cep' 
                    minLength='9' 
                    maxLength='9'
                    placeholder="Insira seu Cep aqui"
                    /><br/>
                </div>
              </div>
            </div>

          )}

      



     
{endereco &&(   
   <div>
     <div className="Card">
       <div className="Title">MeuLocal-ViaCep</div> 
       <div className="Title2">Você está em:</div>
       <ul className="Items">
       <li><strong>Cidade:</strong> {endereco.localidade}</li>
       <li><strong>UF:</strong> {endereco.uf}</li>
       <li><strong>Estado:</strong> {endereco.estado}</li>
       <li><strong>Bairro:</strong> {endereco.bairro}</li>
       <li><strong>Ruas:</strong> {endereco.logradouro}</li>
       <li><strong>Quadras:</strong> {endereco.complemento}</li>
       </ul>
       <button onClick={resetar} className="Botao">Realizar outra pesquisa</button>
     </div>
   </div>        
)}

</>
  );
}

export default App;
