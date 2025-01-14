import axios from "axios";
import { useState } from "react";

const App = () => {
  const [cpfcnpj, setCpfCnpj] = useState("");

  const formatCpfCnpj = (value) => {
    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, "");

    if (value.length <= 11) {
      // Formata como CPF (###.###.###-##)
      return value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      // Formata como CNPJ (##.###.###/####-##)
      return value
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,4})/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
  };
  const handleInputChange = (e) => {
    const formattedValue = formatCpfCnpj(e.target.value);
    setCpfCnpj(formattedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("cpfcnpj", cpfcnpj);
  
    try {
      const response = await axios.post("http://localhost:8000/generate-pdf/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", // Importante para arquivos binários
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "declaracao.pdf"); // Nome do arquivo a ser baixado
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error.response.data);
    }
  };

  return (
    <div className="form-principal">
      <div className="paragraph-title">
        <p className="quantity-two">Gerar declaração de quitação anual de débito</p>
      </div>
      <form className="form-style" onSubmit={handleSubmit}>
        <div className="form-cpf">
          <label className="label-main">CPF/CNPJ:</label>
          <div className="input-cpf">
            <div className="input-main">
              <input
                className="input-text"
                aria-invalid="false"
                autoFocus
                type="text"
                placeholder="Digite aqui"
                value={cpfcnpj}
                onChange={handleInputChange}
                maxLength={18} 
              />
            </div>
          </div>
          <p className="paragraph-info"> * Exemplo: 123.456.789-00 ou 123.456.78/0001-99</p>
        </div>

        <button className="button-send" type="submit">
          Gerar declaração
        </button>
      </form>
    </div>
  );
};

export default App;
