import React from 'react';
import {Container, Row, Col, Button, Table, Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/product.css';
import KugooLogoImage from './images/kugoologo.png';
import KugooHXPlusImage from './images/kugoohxplus.jpg';
import {useKugooHXPlus} from "../hooks/kugoohxplus";


export const KugooHXPlus: React.FC = () =>{
    const {price, stores} = useKugooHXPlus()

    return (
        <div>
            <Container fluid className="maintextforsale">
                <Row>
                    <Col md={12}>
                        <h2 className="mainlead"><img src={KugooLogoImage} alt="" />Электросамокат Kugoo HX plus</h2>
                        <hr />
                    </Col>
                    <Col md={6}>
                        <div className="mainpictureforsale">
                            <a href="https://kugookirin.ru/wp-content/uploads/2022/05/hx-plus-1.jpg" target="_blank"><img src={KugooHXPlusImage} alt="" /></a>
                        </div>
                    </Col>
                    <Col md={6}>
                        <p className="maininf">Модель с уникальным современным дизайном. Подходит для ежедневного передвижения на расстояния до 50 км. Широкая платформа, двойная амортизация, дисковые тормоза и удобный руль обеспечивают комфортное передвижение.</p>
                        <p className="price">Цена: {price}</p>
                        <Button variant="primary" size="lg" className="buttonsale">Заказать</Button>
                        <p className="stores">Наличие:</p>
                        {stores.map((store) => (
                            <p className="stores" key={store.id}>Адрес магазина: {store.address}</p>
                        ))}
                    </Col>
                    <Col md={6}>
                        <h2 className="characteristic">Характеристики</h2>
                        <Table>
                            <tbody>
                            <tr>
                                <td className="name"><span>Вес</span></td>
                                <td className="cur">15 кг</td>
                            </tr>
                            <tr>
                                <td className="name"><span>Мощность</span></td>
                                <td className="cur">249 W</td>
                            </tr>
                            <tr>
                                <td className="name"><span>Максимальная скорость</span></td>
                                <td className="cur">до 25 км/ч</td>
                            </tr>
                            <tr>
                                <td className="name"><span>Максимальный пробег</span></td>
                                <td className="cur">до 40 км*</td>
                            </tr>
                            <tr>
                                <td className="name"><span>Время полной зарядки</span></td>
                                <td className="cur">10-12 часов</td>
                            </tr>
                            <tr>
                                <td className="name"><span>Максимальная нагрузка</span></td>
                                <td className="cur">100 кг</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col md={6}>
                        <h2 className="description">Описание</h2>
                        <p className="description_inf">Электросамокат Kugoo Kirin HX PLUS – безопасное и удобное транспортное средство для поездок по городу. Маневренные колеса диаметром 9 дюймов имеют хорошую амортизацию и позволяют сделать комфортным перемещение даже на неровной дороге. Мотор мощностью 350 Вт позволяет разгоняться до безопасной скорости 30 км/ч. Небольшой вес и складная конструкция обеспечивают удобство перемещения и хранения.
                            Электросамокат Kugoo Kirin HX PLUS оснащен батареей с запасом хода до 50 км, что позволяет выезжать на длинные расстояния. Время полной зарядки составляет 10 ч. Фонарь ярко освещает пространство, что делает поездку безопасной в темное время.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
