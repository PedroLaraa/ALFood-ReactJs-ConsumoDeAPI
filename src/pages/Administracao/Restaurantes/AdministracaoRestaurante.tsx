import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

import React from 'react'

import axios from 'axios'

import { useState, useEffect } from 'react'

import IRestaurante from '../../../interfaces/IRestaurante'

import { Link } from 'react-router-dom';

import http from '../../../config';

const AdministracaoRestaurante = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    const excluirRestaurante = (restauranteDeletado: IRestaurante) => {
        http.delete(`restaurantes/${restauranteDeletado.id}/`)
            .then((res) => {
                const listaRestaurante = restaurantes.filter((restaurante) => restaurante.id !== restauranteDeletado.id)
                setRestaurantes([...listaRestaurante])
                alert('Sucesso ao deletar restaurante!')
            }).catch((err) => {
                alert('Erro ao deletar restaurante!')
            })
    }

    useEffect(() => {
        http.get<IRestaurante[]>("restaurantes/")
            .then(res => {
                console.log(res.data)
                setRestaurantes(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                        <TableCell>
                            [<Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>]
                        </TableCell>
                        <TableCell>
                            <Button type="button" value={restaurante.id} variant="outlined" color="error" onClick={() => excluirRestaurante(restaurante)} >
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurante
