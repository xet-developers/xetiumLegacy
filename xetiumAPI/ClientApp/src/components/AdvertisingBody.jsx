import React from 'react';
import AdvertMeeting from "./AdvertisingBody/AdvertMeeting";
import Function from "./AdvertisingBody/Function";
import WordEnd from "./AdvertisingBody/WordEnd";

const AdvertisingBody = () => {
    return (
        <div>
            <AdvertMeeting/>

            <Function/>

            <WordEnd/>
        </div>
    );
};

export default AdvertisingBody;