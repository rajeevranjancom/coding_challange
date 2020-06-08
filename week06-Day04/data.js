var data = [{
        id: 'newspaper-01',
        name: '1) Hindu',
        languages: [{ name: 'Tamil' }, { name: 'English' }],
        publishers: [{
                name: 'Ramanathan',
                address: {
                    streetNumber: 123,
                    district: 'Krishnagiri',
                    state: 'Tamil nadu'
                },
                designation: 'Head'
            },
            {
                name: 'Shubham',
                address: {
                    streetNumber: 142,
                    district: 'Hyderabad',
                    state: 'Telangana'
                },
                designation: 'CPO'
            }
        ]
    },
    {
        id: 'newspaper-02',
        name: '2) Times Of India',
        languages: [{ name: 'Tamil' }, { name: 'Telugu' }, { name: 'English' }],
        publishers: [{
                name: 'Prathiba Nair',
                address: {
                    streetNumber: 409,
                    district: 'Thalassery',
                    state: 'Kerala'
                },
                designation: 'Deputy Publisher'
            },
            {
                name: 'Anmol Prathap',
                address: {
                    streetNumber: 278,
                    district: 'Mumbai',
                    state: 'Maharashtra'
                },
                designation: 'Chief Technical writer'
            },
            {
                name: 'Palwinder Singh',
                address: {
                    streetNumber: 985,
                    district: 'Jalandhar',
                    state: 'Punjab'
                },
                designation: 'Publication Manager'
            }
        ]
    }
];
/**Details 1 */
/**Title */
var NewspaperId11 = data[0].id;
var NewspaperName11 = data[0].name;
/**Languages */
var languages11 = (data[0].languages[0].name);
var languages12 = (data[0].languages[1].name);

/**Publisher Details 1 */
var PublisherName11 = data[0].publishers[0].name;
var PublisherStreetNumber11 = data[0].publishers[0].address.streetNumber;
var PublisherDistrict11 = data[0].publishers[0].address.district;
var PublisherState11 = data[0].publishers[0].address.state;
var PublisherDesignation11 = data[0].publishers[0].designation;
/**Publisher details 2 */
var PublisherName12 = data[0].publishers[1].name;
var PublisherStreetNumber12 = data[0].publishers[1].address.streetNumber;
var PublisherDistrict12 = data[0].publishers[1].address.district;
var PublisherState12 = data[0].publishers[1].address.state;
var PublisherDesignation12 = data[0].publishers[1].designation;


/**Details 2 */

/**Title */
var NewspaperId21 = data[1].id;
var NewspaperName22 = data[1].name;
/**Languages */
var languages21 = (data[1].languages[0].name);
var languages22 = (data[1].languages[1].name);
var languages23 = (data[1].languages[1].name);

/**Publisher Details 1 */
var PublisherName21 = data[1].publishers[0].name;
var PublisherStreetNumber21 = data[1].publishers[0].address.streetNumber;
var PublisherDistrict21 = data[1].publishers[0].address.district;
var PublisherState21 = data[1].publishers[0].address.state;
var PublisherDesignation21 = data[1].publishers[0].designation;
/**Publisher details 2 */
var PublisherName22 = data[1].publishers[1].name;
var PublisherStreetNumber22 = data[1].publishers[1].address.streetNumber;
var PublisherDistrict22 = data[1].publishers[1].address.district;
var PublisherState22 = data[1].publishers[1].address.state;
var PublisherDesignation22 = data[1].publishers[1].designation;
/**Publisher details 3 */
var PublisherName23 = data[1].publishers[2].name;
var PublisherStreetNumber23 = data[1].publishers[2].address.streetNumber;
var PublisherDistrict23 = data[1].publishers[2].address.district;
var PublisherState23 = data[1].publishers[2].address.state;
var PublisherDesignation23 = data[1].publishers[2].designation;


document.write(NewspaperName11 + ': ' + NewspaperId11);
document.write("<br/>");
document.write("Available in: ", languages11 + "," + languages12)
document.write("<br/> Publishers: ");
document.write("<br/> 1) " + PublisherName11 + "," + PublisherStreetNumber11 + "," + PublisherDistrict11 + "," + PublisherState11 + "/" + PublisherDesignation11)
document.write("<br/> 2) " + PublisherName12 + "," + PublisherStreetNumber12 + "," + PublisherDistrict12 + "," + PublisherState12 + "/" + PublisherDesignation12)

document.write("<br/>")
document.write("<br/>")
document.write("<br/>")


document.write(NewspaperName22 + ': ' + NewspaperId21);
document.write("<br/>");
document.write("Available in: ", languages21 + "," + languages22 + "," + languages23);
document.write("<br/> Publishers: ");
document.write("<br/> 1) " + PublisherName21 + "," + PublisherStreetNumber21 + "," + PublisherDistrict21 + "," + PublisherState21 + "/" + PublisherDesignation21)
document.write("<br/> 2) " + PublisherName22 + "," + PublisherStreetNumber22 + "," + PublisherDistrict22 + "," + PublisherState22 + "/" + PublisherDesignation22)
document.write("<br/> 3) " + PublisherName23 + "," + PublisherStreetNumber23 + "," + PublisherDistrict12 + "," + PublisherState23 + "/" + PublisherDesignation23)