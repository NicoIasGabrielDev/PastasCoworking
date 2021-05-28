import React from "react";
import { Container } from "react-bootstrap";
import MenuHeader from "../../components/navbar";
import Footer from "../../components/footer";

const NotFound = () => {
  return (
    <div>
      <MenuHeader />
      <Container className="form-height">
        <h3 style={{ marginRight: "1.5em", marginLeft: "1.5em" }}>
          Página não encontrada! Verifique se a URL está correta, ou se você
          possui autorização para entrar nessa página.
        </h3>
        <img
          src="https://image.freepik.com/vetores-gratis/ilustracao-do-conceito-de-erro-404_114360-1811.jpg"
          alt="Imagem do erro 404"
        />
      </Container>
      <Footer />
    </div>
  );
};

export default NotFound;
