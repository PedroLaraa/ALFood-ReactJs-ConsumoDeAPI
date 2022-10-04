import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import React from 'react'

import axios from 'axios'

import { useState, useEffect } from 'react'

import IRestaurante from '../../../interfaces/IRestaurante'

const AdministracaoRestaurante = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        axios.get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurante
