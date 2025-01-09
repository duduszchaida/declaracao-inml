import axios from "axios";
import { useState } from "react";

const App = () => {
  const [cpfcnpj, setCpfCnpj] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("cpfcnpj", cpfcnpj);

    try {
      const response = await axios.post(
        "http://localhost:8000/generate-pdf/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

  
      const fileUrl = `http://localhost:8000${response.data.file_url}`;
      console.log("PDF gerado:", fileUrl);

     
      window.open(fileUrl, "_blank");
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error.response.data);
    }
  };

  return (
    <div className="form-principal">
      <div className="paragraph-title">
      <p class="quantity-two">Gerar declaração de quitação anual de débito  </p>
      </div>
      <form className="form-style" onSubmit={handleSubmit}>
        <div className="form-cpf">
          <label className="label-main">CPF/CNPJ:</label>
          <div className="input-cpf">
            <div  className="input-main">
            <input className="input-text"
              aria-invalid="false"
              autofocus=""
              type="text"
              placeholder="Digite aqui"
              value={cpfcnpj}
              onChange={(e) => setCpfCnpj(e.target.value)}
            />
          </div>
          </div>
          <p className="paragraph-info"> * utilizar apenas números, sem pontuação</p>
        </div>
   
        <button className="button-send" type="submit">
          Gerar declaração
        </button>
       
      </form>
    </div>
  );
};

export default App;
