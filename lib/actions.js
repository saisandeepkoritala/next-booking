"use server";

const axios = require('axios');
export const handleSubmit = async (formData) => {

        const {search,Check_in,Check_out}=Object.fromEntries(formData);

        const coordinates = await getCoordinates(search);
        const Hotels =await getHotels(coordinates.latitude,coordinates.longitude,Check_in,Check_out);

        return {Hotels};
        

}       

export const getCoordinates = async (address) => {

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
                        'x-rapidapi-key': '48d3a72e6emshad128265685d312p1abd06jsna1837eaefb55',
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
                                'x-rapidapi-key': '48d3a72e6emshad128265685d312p1abd06jsna1837eaefb55',
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

export const getPics =async(id)=>{
        const options = {
                method: 'GET',
                url: 'https://booking-com.p.rapidapi.com/v1/hotels/photos',
                params: {
                        hotel_id: id,
                        locale: 'en-gb'
                        },
                        headers: {
                                'x-rapidapi-key': '48d3a72e6emshad128265685d312p1abd06jsna1837eaefb55',
                                'x-rapidapi-host': 'booking-com.p.rapidapi.com'
                        }
                };
                
                try {
                        const response = await axios.request(options);
                        return response.data;
                } catch (error) {
                        console.log("error in pics");
                }
}

export const getCars =async(pickupLocation, pickupDate, pickupTime, dropoffLocation, dropoffDate, dropoffTime)=>{

        const pickCoordinates = await getCoordinates(pickupLocation);
        const dropCoordinates = await getCoordinates(dropoffLocation);
        console.log(pickupLocation, pickupDate, pickupTime, dropoffLocation, dropoffDate, dropoffTime)
        console.log(pickCoordinates,dropCoordinates);

        const options = {
                method: 'GET',
                url: 'https://booking-com.p.rapidapi.com/v1/car-rental/search',
                params: {
                        locale: 'en-gb',
                        drop_off_longitude:dropCoordinates.longitude,
                        pick_up_longitude:pickCoordinates.longitude,
                        currency: 'USD',
                        pick_up_datetime:`${pickupDate} ${pickupTime}`,
                        drop_off_latitude:dropCoordinates.latitude,
                        pick_up_latitude:pickCoordinates.latitude,
                        from_country: 'it',
                        sort_by: 'recommended',
                        drop_off_datetime: `${dropoffDate} ${dropoffTime}`,
                        },
                        headers: {
                                'x-rapidapi-key': '48d3a72e6emshad128265685d312p1abd06jsna1837eaefb55',
                                'x-rapidapi-host': 'booking-com.p.rapidapi.com'
                        }
                };
                
                try {
                        const response = await axios.request(options);
                        return response.data;
                } catch (error) {
                        console.log("error in cars");
                }
} 

export const getAttractions=async(latitude,longitude)=>{
        //Travel Advisor API
        const options = {
                        method: 'GET',
                        url: 'https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng',
                        params: {
                        longitude: longitude,
                        latitude: latitude,
                        lunit: 'km',
                        currency: 'USD',
                        lang: 'en_US'
                        },
                        headers: {
                        'x-rapidapi-key': '549338403fmsh72e852f8489002dp184afbjsna0359def5579',
                        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
                        }
                };
                
                try {
                        const response = await axios.request(options);
                        return response.data;
                } catch (error) {
                        console.log("error in attraction");
                }

}