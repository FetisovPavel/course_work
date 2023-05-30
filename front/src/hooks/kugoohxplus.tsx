import React, {useEffect, useState} from "react";

export function useKugooHXPlus(){
    const [price, setPrice] = useState('');
    const [stores, setStores] = useState<{ id: number; address: string; name: string; }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/products/KugooHXPlus', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setPrice(data.price)
                    setStores(data.stores)
                    console.log(data.stores)
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return {price, stores}

}