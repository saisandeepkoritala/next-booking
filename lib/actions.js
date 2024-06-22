"use server";

const axios = require('axios');
export const handleSubmit = async (formData) => {
        console.log("hiiiiiii",formData); 
        const {search,Check_in,Check_out}=Object.fromEntries(formData);
        console.log("wowwww",Check_in,Check_out);

        const coordinates = await getCoordinates(search);
        console.log(coordinates);

        const Hotels =await getHotels(coordinates.latitude,coordinates.longitude,Check_in,Check_out);

        // convert Hotels to json and return
        return {Hotels};
        

}       

const getCoordinates = async (address) => {

        const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3Vubnl0YW11ayIsImEiOiJjbG43cGx4amcwcDVvMmtvZHlkMjVmNmY5In0.wCsRhvGwpugEjjd7ae_0ZA&limit=1`;

        try {
                const response = await axios.get(URL);
                const data = response.data;

                if (data.features.length === 0) {
                throw new Error('No location found');
                }

                const { center, place_name } = data.features[0];
                return {
                latitude: center[1],
                longitude: center[0],
                location: place_name
                };
        } catch (error) {
                console.log("error in getting coordinates");
        }
}

const getHotels =async(latitude,longitude,checkin,checkout)=>{
        console.log(latitude,longitude,checkin,checkout);
        const options = {
                method: 'GET',
                url: 'https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates',
                params: {
                include_adjacency: 'true',
                categories_filter_ids: 'class::2,class::4,free_cancellation::1',
                children_ages: '5,0',
                order_by: 'popularity',
                longitude: longitude,
                room_number: '1',
                children_number: '2',
                adults_number: '2',
                locale: 'en-gb',
                checkin_date: checkin,
                checkout_date: checkout,
                page_number: '0',
                filter_by_currency: 'USD',
                latitude:latitude,
                units: 'metric'
                },
                headers: {
                'x-rapidapi-key': '549338403fmsh72e852f8489002dp184afbjsna0359def5579',
                'x-rapidapi-host': 'booking-com.p.rapidapi.com'
                }
        };
        
        try {
                const response = await axios.request(options);
                return response.data;
        } catch (error) {
                console.log("hotels error");
        }

}


export const getHotelDetails =async(id,checkin,checkout)=>{
        const options = {
                method: 'GET',
                url: 'https://booking-com.p.rapidapi.com/v2/hotels/description',
                params: {
                        currency: 'USD',
                        locale: 'en-gb',
                        checkout_date:checkin,
                        hotel_id:id,
                        checkin_date:checkout
                        },
                        headers: {
                        'x-rapidapi-key': '549338403fmsh72e852f8489002dp184afbjsna0359def5579',
                        'x-rapidapi-host': 'booking-com.p.rapidapi.com'
                        }
                };
                
                try {
                        const response = await axios.request(options);
                        return response.data;
                } catch (error) {
                        console.error("error in getting hotel details");
                }
}