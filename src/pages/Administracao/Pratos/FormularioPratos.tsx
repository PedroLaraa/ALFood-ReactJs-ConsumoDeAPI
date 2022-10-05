import React from 'react';

import { useState, useEffect } from 'react';

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

import { useParams } from 'react-router-dom';

import IRestaurante from "../../../interfaces/IRestaurante"

import http from '../../../config';

import ITag from '../../../interfaces/ITag';
import IPrato from '../../../interfaces/IPrato';

const FormularioPratos = () => {

    const parametros = useParams()

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')

    const [tag, setTag] = useState('')
    const [restaurante, setRestaurante] = useState('')

    const [imagem, setImagem] = useState<File | null>(null)

    const [tags, setTags] = useState<ITag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    const [restauranteEdit, setRestauranteEdit] = useState(Number)
    const [imagemEdit, setImagemEdit] = useState('')

    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
            .then(resposta => setTags(resposta.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }
    }

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const formData = new FormData();

        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)

        formData.append('tag', tag)

        formData.append('restaurante', restaurante)

        if (!parametros) {
            if (imagem) {
                formData.append('imagem', imagem)
            }
            http.request({
                url: 'pratos/',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
                .then(() => {
                    setNomePrato('')
                    setDescricao('')
                    setTag('')
                    setRestaurante('')
                    alert('Prato cadastrado com sucesso!')
                })
                .catch(erro => console.log(erro))
        } else {
            http.put(`pratos/${parametros.id}/`, {
                nome: nomePrato,
                descricao: descricao,
                tag: tag,
                restaurante: restauranteEdit
            })
                .then(() => {
                    alert('Prato editado com sucesso!')
                })
                .catch(erro => console.log(erro))
        }
    }

    useEffect(() => {
        if (parametros.id) {
            http.get<IPrato>(`pratos/${parametros.id}/`)
                .then((res) => {
                    setNomePrato(res.data.nome)
                    setDescricao(res.data.descricao)
                    setTag(res.data.tag)
                    setRestauranteEdit(res.data.restaurante)
                    setImagemEdit(res.data.imagem)

                }).catch((err) => {
                    console.log(err);
                })
        }
    }, [parametros])

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={nomePrato}
                    onChange={evento => setNomePrato(evento.target.value)}
                    label="Nome do Prato"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                <TextField
                    value={descricao}
                    onChange={evento => setDescricao(evento.target.value)}
                    label="Descrição do Prato"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <FormControl margin="dense" fullWidth >
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                        {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                            {tag.value}
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl margin="dense" fullWidth >
                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                    <Select labelId="select-restaurante" value={!restaurante ? restauranteEdit.toString() : restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                        {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                            {restaurante.nome}
                        </MenuItem>)}
                    </Select>
                </FormControl>

                <input type="file" onChange={selecionarArquivo} />

                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )

};

export default FormularioPratos;
