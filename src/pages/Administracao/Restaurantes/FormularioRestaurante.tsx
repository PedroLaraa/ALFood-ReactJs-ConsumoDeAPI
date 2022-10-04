import React from 'react'

import { useState } from 'react'

import { TextField, Button } from "@mui/material";

import axios from "axios"

const FormularioRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        axios.post("http://localhost:8000/api/v2/restaurantes/")
            .then((res) => {
                alert("Restaurante cadastrado com sucesso!")
            }).catch((err) => {
                alert("Erro ao cadastrar restaurante!")
                console.log(err)
            })
    };

    return (
        <form onSubmit={aoSubmeterForm}>
            <TextField
                value={nomeRestaurante}
                onChange={evento => setNomeRestaurante(evento.target.value)}
                id="standard-basic"
                label="Nome do restaurante:"
                variant="standard" />
            <Button
                type="submit"
                variant="outlined"
            >
                Salvar
            </Button>
        </form>
    );
};

export default FormularioRestaurante;