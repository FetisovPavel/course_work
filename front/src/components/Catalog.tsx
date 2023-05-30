import React, {useEffect} from 'react';
import {Navbar, Nav, Container, Row, Col, Card, Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/catalog.css';
import './css/mainmenu.css';
import kugooHXplusImage from './images/kugoohxplus.jpg';
import kugooM4proImage from './images/kugoom4pro.jpg';
import kugooS3Image from './images/kugoos3.jpg';
import xiaomiHIMOc20Image from './images/xiaomihimoc20.jpg';
import xiaomiQicycleImage from './images/xiaomiqicycle.jpg';
import {useClient} from "../hooks/client";

export const Catalog: React.FC = () => {
    const {user, navigate} = useClient()

    const handleKugooHXPlus = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            navigate('/kugoohxplus', { state: { user } });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <section className="main-content">
                <Container>
                    <Row>
                        <Col lg={4} sm={6}>
                            <Card className="product-card">
                                <Card.Img variant="top" src={kugooHXplusImage} />
                                <Card.Body>
                                    <Card.Title><a onClick={handleKugooHXPlus}>Kugoo HX plus</a></Card.Title>
                                    <Card.Text>
                                        Модель с уникальным современным дизайном. Подходит для ежедневного передвижения на расстояния до 50 км. Широкая платформа, двойная амортизация, дисковые тормоза и удобный руль обеспечивают комфортное передвижение.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <div className="product-links">
                                        <a onClick={handleKugooHXPlus}>Подробнее</a>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>

                        <Col lg={4} sm={6}>
                            <Card className="product-card">
                                <Card.Img variant="top" src={kugooM4proImage} />
                                <Card.Body>
                                    <Card.Title><a href="#">Kugoo M4 pro</a></Card.Title>
                                    <Card.Text>
                                        Электросамокат Kugoo Kirin M4 Pro – легкое и качественное транспортное средство для поездок по городу.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <div className="product-links">
                                        <a href="kugooM4pro.html">Подробнее</a>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>

                        <Col lg={4} sm={6}>
                            <Card className="product-card">
                                <Card.Img variant="top" src={kugooS3Image} />
                                <Card.Body>
                                    <Card.Title><a href="#">Kugoo S3</a></Card.Title>
                                    <Card.Text>
                                        Электросамокат Jilong Kugoo S3 - идеально подходит для прогулок и ежедневных поездок на работу.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <div className="product-links">
                                        <a href="kugooS3.html">Подробнее</a>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>

                        <Col lg={4} sm={6}>
                            <Card className="product-card">
                                <Card.Img variant="top" src={xiaomiHIMOc20Image} />
                                <Card.Body>
                                    <Card.Title><a href="#">Xiaomi HIMO C20</a></Card.Title>
                                    <Card.Text>
                                        Xiaomi Himo C20 Electric Power Bicycle Grey - высокотехнологичный электровелосипед нового поколения. Устройство оснащено электромотором мощностью 250 Вт, который обеспечивает быстрый набор скорости.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <div className="product-links">
                                        <a href="xiaomiHIMOc20.html">Подробнее</a>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>

                        <Col lg={4} sm={6}>
                            <Card className="product-card">
                                <Card.Img variant="top" src={xiaomiQicycleImage} />
                                <Card.Body>
                                    <Card.Title><a href="#">Xiaomi Qicycle</a></Card.Title>
                                    <Card.Text>
                                        Электровелосипед Xiaomi Mi QiCYCLE — ваш электронный друг и незаменимый помощник в езде по городу, ведь теперь можно забыть о кручении педалей: легко довезёт хозяина в любую точку в радиусе 45 километров со скоростью до 20 км/ч.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <div className="product-links">
                                        <a href="xiaomiQicycle.html">Подробнее</a>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}
