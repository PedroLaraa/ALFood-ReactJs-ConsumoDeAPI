import React from 'react';

import { useState, useEffect } from 'react';

import { TextField, Button, Box, Typography, AppBar, Container, Toolbar, Link, Paper } from "@mui/material";

import { useParams } from 'react-router-dom';

import IRestaurante from '../../../interfaces/IRestaurante';

import http from '../../../config';

const FormularioRestaurante = () => {

    const parametros = useParams();

    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {

        evento.preventDefault();

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            }).then((res) => {
                alert("Restaurante editado com sucesso!");

            }).catch((err) => {
                alert('Erro ao editar restaurante!');
                console.log(err);
            })
        } else {
            http.post("restaurantes/", {
                nome: nomeRestaurante
            })
                .then((res) => {
                    alert("Restaurante cadastrado com sucesso!");

                }).catch((err) => {
                    alert("Erro ao cadastrar restaurante!");
                    console.log(err);
                });
        };
    };

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then((res) => {
                    setNomeRestaurante(res.data.nome);

                }).catch((err) => {
                    console.log(err);
                })
        }
    }, [parametros])

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                <Typography component='h1' variant='h6'>Formulário de Restaurante: </Typography>
                <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                    <TextField
                        value={nomeRestaurante}
                        onChange={evento => setNomeRestaurante(evento.target.value)}
                        id="standard-basic"
                        label="Nome do restaurante:"
                        fullWidth
                        required
                        variant="standard" />
                    <Button
                        type="submit"
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: "1rem" }}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default FormularioRestaurante;