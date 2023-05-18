import React, { useState, useEffect } from 'react';
import s from './TableProductos.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpAZ, faArrowDownAZ, faArrowUp19, faArrowDown19, faDatabase, faGlobe, faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { getProductByName, getAllProducts, getCategorys } from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import CheckState from '../DetailCard/CheckBox/CheckState';



const TableProductos = ({ handleFilter, handleClickDetail, ...props }) => {
    const [nameFilter, setNameFilter] = useState('A-Z')
    const [priceFilter, setPriceFilter] = useState('1-9')
    const [categoryFilter, setCategoryFilter] = useState('Category')
    const [input, setInput] = useState("")
    const { products } = props
    const dispatch = useDispatch()

    const { categorys } = useSelector((state) => state)
    const categoriasMatch = categorys ? categorys.flat(obj => obj?.categories)?.map(cat => {
        return { category_id: cat.category_id, name: cat.name }
    }) : []



    useEffect(() => {
        dispatch(getCategorys());
    }, [dispatch]);

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

    const handleClickCategoryFilter = (e) => {
        const { name, value } = e.target
        handleFilter(name, value)

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
    // console.log('adasdaasdasd', products)s

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: "350px" }}>Nombre{' '}
                            <span>
                                <FontAwesomeIcon className={s.icon} onClick={() => handleClickNameFilter('name')}
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
                                <FontAwesomeIcon className={s.icon} onClick={() => handleClickPriceFilter('price')}
                                    icon={priceFilter === '1-9' ? faArrowUp19 : faArrowDown19} />
                            </span>
                        </th>
                        <th>
                            <select
                                name="category"
                                onChange={e => handleClickCategoryFilter(e)}
                                className={s.selectorCategory}
                                required
                            >
                                <option value={categoryFilter} >{categoryFilter}</option>
                                {categoriasMatch &&
                                    categoriasMatch.map(c => (
                                        <option key={c.category_id} value={c.name} primary={c.name}>
                                            {c.name}
                                        </option>
                                    ))}
                            </select>

                        </th>
                        <th>Stock</th>
                        <th>Fecha de Creacion</th>
                        <th style={{ width: "50px" }}></th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((wine, index) => (
                        <tr key={index} className={s.rowProduct} onClick={() => handleClickDetail(wine.product_id)}>
                            <td><a>{wine.name}</a></td>
                            <td><img src={wine.image} alt={`image-of-${wine.name}`} /></td>
                            <td><a>{wine.normal_price}</a></td>
                            <td><a>{wine.Category_product.name}</a></td>
                            <td><a>{wine.stock}</a></td>
                            <td><a>{new Date(wine.createdAt).toLocaleString('es-ES', {
                                day: 'numeric',
                                month: 'numeric',
                                year: 'numeric',
                            })}</a></td>
                            {/* <td><button onClick={() => handleClickDetail(wine.product_id)}>Ver</button></td> */}
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
