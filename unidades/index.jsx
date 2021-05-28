import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Card, Container, Jumbotron, Spinner } from 'react-bootstrap';
import UnidadeServico from '../../../../services/unidadeservico';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import * as Icon from 'react-bootstrap-icons';
import Menu from '../../../../components/navbar';
import Footer from '../../../../components/footer';
import './index.css'

const Unidade = () => {
    const [unidades, setUnidades] = useState([]);
    const { addToast } = useToasts();

    const cadastrar = (values) => {
        UnidadeServico
            .cadastrarUnidade(values)
            .then(resultado => {
                if (resultado.data.sucesso) {
                    addToast(resultado.data.mensagem, {
                        appearance: 'success',
                        autoDismiss: true,
                    })
                    //resetamos o formik ao cadastrar
                    formik.resetForm();
                    listarUnidade();
                } else {
                    addToast(resultado.data.mensagem, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                }

                formik.setSubmitting(false);
            })
    }

    const alterar = (values) => {
        UnidadeServico
            .alterar(values)
            .then(resultado => {
                if (resultado.data.sucesso) {
                    addToast(resultado.data.mensagem, {
                        appearance: 'success',
                        autoDismiss: true,
                    })
                    formik.resetForm();
                    listarUnidade();
                } else {
                    addToast(resultado.data.mensagem, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                }

                formik.setSubmitting(false);
            })
    }

    const formik = useFormik({
        initialValues: {
            id: '',
            nome:'',
            logradouro:'',
            numero:'',
            complemento:'',
            bairro:'',
            cidade:'',
            uf:'',
            cep:'',
            imagem:'',
        },
        onSubmit: values => {
            console.log(values);
            if (values.id === '') {
                cadastrar(values)
            } else {
                alterar(values);
            }
        },
       
       
    })

    const listarUnidade = () => {
        UnidadeServico
            .listarUnidade()
            .then(resultado => {
                setUnidades(resultado.data.data);
            })
    }

    useEffect(() => {
        listarUnidade();
    }, [])

    const editar = (event) => {
        event.preventDefault();

        const unidade = unidades.filter(x => {
            return x.id === event.target.value
        })

        formik.setValues({
            id: unidade[0].id,
            nome: unidade[0].nome,
            logradouro: unidade[0].logradouro,
            numero: unidade[0].numero,
            complemento: unidade[0].complemento,
            bairro: unidade[0].bairro,
            cidade: unidade[0].cidade,
            uf: unidade [0].uf,
            cep: unidade [0].cep,
            imagem: unidade[0].imagem,
        })

    }

    return (

        <div>
            <Menu />
            <Container className='form-height'>
                <Form onSubmit={formik.handleSubmit} className='form-signin'>
                    <h1 className='h1-register' style={{ textDecoration: 'underline', textDecorationColor: '#03658C' }}>Cadastro de unidades </h1>

                    <div >
                        <Form.Group className='group-height'>
                            <Form.Label className='form-register-text bold'>Nome:</Form.Label>
                            <Form.Control className='feedback-input' type="text" value={formik.values.nome} onChange={formik.handleChange} name="nome" placeholder="Nome da unidade" className='form-control-register' />
                            {formik.errors.nome && formik.touched.nome ? (<div className="error">{formik.errors.nome}</div>) : null}
                        </Form.Group>

                        <Form.Group className='group-height'>
                            <Form.Label className='form-register-text bold'>Logradouro:</Form.Label>
                            <Form.Control as="textarea" rows={3} value={formik.values.logradouro} onChange={formik.handleChange} name="logradouro" placeholder="Insira o logradouro "/>
                            {formik.errors.logradouro && formik.touched.logradouro ? (<div className="error">{formik.errors.logradouro}</div>) : null}
                        </Form.Group>

                        <Form.Group className='group-height'>
                            <Form.Label className='form-register-text bold'>Número:</Form.Label>
                            <Form.Control type="number" value={formik.values.numero} onChange={formik.handleChange} name="numero" placeholder="Insira o número " />
                            {formik.errors.numero && formik.touched.numero ? (<div className="error">{formik.errors.numero}</div>) : null}
                        </Form.Group>

                        <Form.Group className='group-height'>
                            <Form.Label className='form-register-text bold'>Complemento:</Form.Label>
                            <Form.Control className='feedback-input' type="text" value={formik.values.complemento} onChange={formik.handleChange} name="complemento" placeholder="Insira o complemento" className='form-control-register' />
                            {formik.errors.nome && formik.touched.complemento ? (<div className="error">{formik.errors.complemento}</div>) : null}
                        </Form.Group>

                        <Form.Group className='group-height'>
                            <Form.Label className='form-register-text bold'>Bairro:</Form.Label>
                            <Form.Control className='feedback-input' type="text" value={formik.values.bairro} onChange={formik.handleChange} name="bairro" placeholder="Insira o bairro" className='form-control-register' />
                            {formik.errors.nome && formik.touched.bairro ? (<div className="error">{formik.errors.bairro}</div>) : null}
                        </Form.Group>

                        <Form.Group className='group-height'>
                            <Form.Label className='form-register-text bold'>Cidade:</Form.Label>
                            <Form.Control className='feedback-input' type="text" value={formik.values.cidade} onChange={formik.handleChange} name="cidade" placeholder="Insira a cidade" className='form-control-register' />
                            {formik.errors.nome && formik.touched.cidade ? (<div className="error">{formik.errors.cidade}</div>) : null}
                        </Form.Group>

                        <Form.Group className='group-height'>
                            <Form.Label className='form-register-text bold'>UF:</Form.Label>
                            <Form.Control className='feedback-input' type="text" value={formik.values.uf} onChange={formik.handleChange} name="uf" placeholder="Insira o UF" className='form-control-register' />
                            {formik.errors.nome && formik.touched.uf ? (<div className="error">{formik.errors.uf}</div>) : null}
                        </Form.Group>

                        <Form.Group className='group-height'>
                            <Form.Label className='form-register-text bold'>Cep:</Form.Label>
                            <Form.Control type="zip-code" value={formik.values.cep} onChange={formik.handleChange} name="cep" placeholder="Insira o CEP" />
                            {formik.errors.cep && formik.touched.cep ? (<div className="error">{formik.errors.cep}</div>) : null}
                        </Form.Group>

                        <Form.Group className='group-height'>
                            <Form.Label className='form-register-text bold'>Url da imagem:</Form.Label>
                            <Form.Control type="text" value={formik.values.imagem} onChange={formik.handleChange} name="imagem" placeholder="Url da Imagem" />
                            {formik.errors.imagem && formik.touched.imagem ? (<div className="error">{formik.errors.imagem}</div>) : null}
                            {formik.values.imagem && <img src={formik.values.imagem} style={{ width: '470px' }} />}
                        </Form.Group>



                        <button id="btn" type="submit" disabled={!formik.isValid || formik.isSubmitting ? <Spinner animation="border" size="sm" /> : null} style={{ fontWeight: 'bold' }} style={{ marginLeft: '1.7em', marginBottom: '1em', marginTop: '2em' }} >Cadastrar</button>

                    </div>
                </Form>

                

            </Container>
            <Table  size="sm" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Nome</th>
                            <th>Logradouro</th>
                            <th>Complemento</th>
                            <th>Bairro</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>CEP</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        //mapeamos para organizar na tabela
                            unidades.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td><img src={item.imagem} style={{ width : '120px'}}/></td>
                                        <td>{item.nome}</td>
                                        <td style={{width:'100px'}}>{item.logradouro}<br /></td>
                                        <td>{item.complemento}</td>
                                        <td>{item.bairro}</td>
                                        <td>{item.cidade}</td>
                                        <td>{item.uf}</td>
                                        <td>{item.cep}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

            <Footer />
        </div>
    )

}





export default Unidade;