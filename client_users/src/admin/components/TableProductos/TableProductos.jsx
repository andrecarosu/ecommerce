import React, { useState } from 'react';
import s from './TableProductos.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpAZ, faArrowDownAZ, faArrowUp19, faArrowDown19, faDatabase, faGlobe, faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { getProductByName, getAllProducts } from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import CheckState from '../DetailCard/CheckBox/CheckState';



const TableProductos = ({ handleFilter, handleClickDetail, ...props }) => {
    const [nameFilter, setNameFilter] = useState('A-Z')
    const [priceFilter, setPriceFilter] = useState('1-9')
    const [input, setInput] = useState("")
    const { products } = props
    const dispatch = useDispatch()

    const handleClickNameFilter = (type) => {
        handleFilter(type, nameFilter)
        if (nameFilter === 'A-Z') {
            setNameFilter('Z-A')
        } else if (nameFilter === 'Z-A') {
            setNameFilter('A-Z')
        }

    }

    const handleClickPriceFilter = (type) => {
        handleFilter(type, priceFilter)
        if (priceFilter === '1-9') {
            setPriceFilter('9-1')
        } else if (priceFilter === '9-1') {
            setPriceFilter('1-9')
        }

    }

    const onCheckState = (e) => {
        const { value, name } = e.target
        // value ? setCheckState(false) : setCheckState(true)
        console.log('checks', value)
    }

    const onSearch = (e) => {
        const { name } = e.target
        const { value } = e.target
        setInput(value)
        if (value !== "") {
            dispatch(getProductByName(value));
        } else {
            dispatch(getAllProducts())
        }

    }
    console.log('adasdaasdasd', products)

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: "350px" }}>Nombre{' '}
                            <span>
                                <FontAwesomeIcon onClick={() => handleClickNameFilter('name')}
                                    icon={nameFilter === 'A-Z' ? faArrowUpAZ : faArrowDownAZ} />
                            </span>
                            <input
                                className={s.searchInput}
                                name="search"
                                placeholder='Buscar'
                                value={input}
                                onChange={onSearch}

                            />
                        </th>
                        <th>Imagen</th>
                        <th>Precio
                            <span>
                                <FontAwesomeIcon onClick={() => handleClickPriceFilter('price')}
                                    icon={priceFilter === '1-9' ? faArrowUp19 : faArrowDown19} />
                            </span>
                        </th>
                        <th>Categoria</th>
                        <th>Stock</th>
                        <th>Fecha de Creacion</th>
                        <th></th>
                        <th></th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((wine, index) => (
                        <tr key={index}>
                            <td><a>{wine.name}</a></td>
                            <td><img src={wine.image} alt={`image-of-${wine.name}`} /></td>
                            <td><a>{wine.normal_price}</a></td>
                            <td><a>{wine.Category_product.family}</a></td>
                            <td><a>{wine.stock}</a></td>
                            <td><a>{new Date(wine.createdAt).toLocaleString('es-ES', {
                                day: 'numeric',
                                month: 'numeric',
                                year: 'numeric',
                            })}</a></td>
                            <td><button onClick={() => handleClickDetail(wine.product_id)}>Ver</button></td>
                            <td><Link to={`/dashboard/productos/edit-product/${wine.product_id}`}><button>Editar</button></Link></td>
                            <td>
                                <CheckState state={wine.state} product_id={wine.product_id} />
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </>
    );
}

export default TableProductos;
