import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

import { useState, useEffect } from 'react'

import IPrato from '../../../interfaces/IPrato'

import { Link } from 'react-router-dom';

import http from '../../../config';

const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([]);

    const excluirPrato = (pratoDeletado: IPrato) => {
        http.delete(`pratos/${pratoDeletado.id}/`)
            .then((res) => {
                const listaPrato = pratos.filter((prato) => prato.id !== pratoDeletado.id)
                setPratos([...listaPrato])
                alert('Sucesso ao deletar prato!')
            }).catch((err) => {
                alert('Erro ao deletar prato!')
            })
    }

    useEffect(() => {
        http.get<IPrato[]>("pratos/")
            .then(res => {
                console.log(res.data)
                setPratos(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                Descrição
                            </TableCell>
                            <TableCell>
                                Tag
                            </TableCell>
                            <TableCell>
                                Imagem
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
                        {pratos.map(prato => <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                            <TableCell>
                                {prato.descricao}
                            </TableCell>
                            <TableCell>
                                {prato.tag}
                            </TableCell>
                            <TableCell>
                                <img src={prato.imagem} width='100px' />
                            </TableCell>
                            <TableCell>
                                [<Link to={`/admin/pratos/${prato.id}`}>Editar</Link>]
                            </TableCell>
                            <TableCell>
                                <Button type="button" value={prato.id} variant="outlined" color="error" onClick={() => excluirPrato(prato)} >
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AdministracaoPratos
