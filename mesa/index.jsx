import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Table,
  Card,
  Container,
  Jumbotron,
  Spinner,
} from "react-bootstrap";
import MesaServico from "../../../../services/mesaservico";
import SalaServico from "../../../../services/salaservico";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToasts } from "react-toast-notifications";
import * as Icon from "react-bootstrap-icons";
import Menu from "../../../../components/navbar";
import Footer from "../../../../components/footer";
import "./index.css";

const Mesa = () => {
  const [mesas, setMesas] = useState([]);
  const [salas, setSalas] = useState([]);
  const { addToast } = useToasts();

  const cadastrar = (values) => {
    MesaServico.cadastrarMesa(values).then((resultado) => {
      if (resultado.data.sucesso) {
        addToast(resultado.data.mensagem, {
          appearance: "success",
          autoDismiss: true,
        });
        //resetamos o formik ao cadastrar
        formik.resetForm();
        listarMesa();
      } else {
        addToast(resultado.data.mensagem, {
          appearance: "error",
          autoDismiss: true,
        });
      }

      formik.setSubmitting(false);
    });
  };

  const alterar = (values) => {
    MesaServico.editarMesa(values).then((resultado) => {
      if (resultado.data.sucesso) {
        addToast(resultado.data.mensagem, {
          appearance: "success",
          autoDismiss: true,
        });
        formik.resetForm();
        listarMesa();
      } else {
        addToast(resultado.data.mensagem, {
          appearance: "error",
          autoDismiss: true,
        });
      }

      formik.setSubmitting(false);
    });
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      titulo: "",
      quantidadeCadeira: "",
      idSala: "",
    },
    onSubmit: (values) => {
      console.log(values);
      if (values.id === "") {
        cadastrar(values);
      } else {
        alterar(values);
      }
    },
  });

  const listarMesa = () => {
    MesaServico.listarMesa().then((resultado) => {
      setMesas(resultado.data.data);
    });
  };

  useEffect(() => {
    listarMesa();
  }, []);

  const listarSala = () => {
    SalaServico.listarSala().then((resultado) => {
      setSalas(resultado.data.data);
    });
  };

  useEffect(() => {
    listarSala();
  }, []);

  const editar = (event) => {
    event.preventDefault();

    const mesa = mesas.filter((x) => {
      return x.id === event.target.value;
    });

    formik.setValues({
      id: mesa[0].id,
      titulo: mesa[0].titulo,
      quantidadeCadeira: mesa[0].quantidadeCadeira,
      idSala: mesa[0].idSala,
    });
  };

  return (
    <div>
      <Menu />
      <Container className="form-height">
        <Form onSubmit={formik.handleSubmit} className="form-signin">
          <h1
            className="h1-register"
            style={{
              textDecoration: "underline",
              textDecorationColor: "#03658C",
            }}
          >
            Cadastro de mesas{" "}
          </h1>

          <div>
            <Form.Group className="group-height">
              <Form.Label className="form-register-text bold">
                Título:
              </Form.Label>
              <Form.Control
                className="feedback-input"
                type="text"
                value={formik.values.titulo}
                onChange={formik.handleChange}
                name="titulo"
                placeholder="Título da cadeira"
                className="form-control-register"
              />
              {formik.errors.titulo && formik.touched.titulo ? (
                <div className="error">{formik.errors.titulo}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="group-height">
              <Form.Label className="form-register-text bold">
                Quantidade de cadeiras:
              </Form.Label>
              <Form.Control
                type="number"
                value={formik.values.quantidadeCadeira}
                onChange={formik.handleChange}
                name="quantidadeCadeira"
                placeholder="Insira a quantidade de cadeiras"
              />
              {formik.errors.quantidadeCadeira &&
                formik.touched.quantidadeCadeira ? (
                <div className="error">{formik.errors.quantidadeCadeira}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="group-height">
              <Form.Label className="form-register-text bold">Sala</Form.Label>
              <Form.Control className='form-register' as="select" value={formik.values.idSala} onChange={formik.handleChange} name="idSala">
                {formik.errors.idSala && <formik className="touched idSala"></formik> ? (<div className="error">{formik.errors.idSala}</div>) : null}
                <option value={0}>Selecione</option>
                {salas.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.titulo}
                    </option>
                  );
                })}

              </Form.Control>

            </Form.Group>

            <button
              id="btn"
              type="submit"
              disabled={
                !formik.isValid || formik.isSubmitting ? (
                  <Spinner animation="border" size="sm" />
                ) : null
              }
              style={{ fontWeight: "bold" }}
              style={{
                marginLeft: "1.7em",
                marginBottom: "1em",
                marginTop: "2em",
              }}
            >
              Cadastrar
            </button>
          </div>
        </Form>
      </Container>
      <Table size="sm" striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Quantidade de mesas</th>
            <th>Sala</th>
          </tr>
        </thead>
        <tbody>
          {
            //mapeamos para organizar na tabela
            mesas.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.titulo}</td>
                  <td>
                    {item.quantidadeCadeira}
                    <br />
                  </td>
                  <td>{item.idSala}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>

      <Footer />
    </div>
  );
};

export default Mesa;
