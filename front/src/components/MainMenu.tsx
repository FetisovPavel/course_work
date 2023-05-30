import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/mainmenu.css';
import mainImage from './images/основное.jpg';
import carouselImage1 from './images/для слайда1.jpg';
import carouselImage2 from './images/для слайда2.jpg';
import carouselImage3 from './images/для слайда3.jpg';
import {useClient} from "../hooks/client";

export const MainMenu: React.FC = () => {

    const {user, navigate} = useClient()

    const handleCatalogClick = async () => {
        try {
            navigate('/catalog', { state: { user } });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="container-fluid my-carousel">
                <div
                    id="carouselExampleIndicators"
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                    data-bs-interval="5000"
                >
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" />
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2" />
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3" />
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={carouselImage1} className="d-block w-100" alt="..." />
                            <div className="carousel-caption">
                                <h1 className="display-2">CarshBike</h1>
                                <h3>Катайся в удовольствие</h3>
                                <button onClick={handleCatalogClick} className="btn btn-primary">
                                    Смотреть ассортимент
                                </button>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={carouselImage2} className="d-block w-100" alt="..." />
                            <div className="carousel-caption">
                                <h1 className="display-3">Скидки 20% на Kugoo</h1>
                                <h3>-5% за оплату онлайн</h3>
                                <button onClick={handleCatalogClick} className="btn btn-primary">
                                    В каталог
                                </button>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={carouselImage3} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container-fluid main_text">
                <div className="row jumbotron">
                    <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10">
                        <h2 className="lead">Что такое аренда по подписке?</h2>
                        <p className="maintext">Вы получаете в аренду не только сам электросамокат, но и техническое обслуживание с оперативной поддержкой клиентского сервиса.</p>
                    </div>
                    <div className="mainpicture">
                        <img src={mainImage} alt="" />
                    </div>
                </div>
            </div>
            <footer className="bg-light text-center text-lg-start">
                <div className="text-center p-3" style={{ backgroundColor: 'rgba(88, 75, 75, 0.2)' }}>
                    © 2023 CarshBike
                </div>
            </footer>
        </div>
    );
};
