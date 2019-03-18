import APIs from './model.js';
import { SingleMarkTemplate, ClusterTemplate } from './templates.js';

ymaps.ready(init);


function init() { 
    const yandexMap = new ymaps.Map("yandex-map", {
        center: [55.76, 37.64],
        zoom: 7
    });

    //CLUSTER
    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: MultipleLandmarkRevTemplateClass,
        clusterBalloonPanelMaxMapArea: 0,
        // Устанавливаем размеры макета контента балуна (в пикселях).
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        clusterBalloonPagerSize: 7
    });

    yandexMap.geoObjects.add(clusterer);

    //BALLOONS
    var MultipleLandmarkRevTemplateClass = ymaps.templateLayoutFactory.createClass(
        ClusterTemplate,
        {  
            build: function() {
                MultipleLandmarkRevTemplateClass.superclass.build.call(this);

                const aLocation = document.querySelector('#aLocation');
                
            },
            clear: function () {
                //aLocation.removeEventListener('click', );
                SingleLandmarkRevTemplateClass.superclass.clear.call(this);
            },    

        }
    );

    
    // const currentLocation = navigator.geolocation.getCurrentPosition((result) => result);
    const SingleLandmarkRevTemplateClass = ymaps.templateLayoutFactory.createClass(
        SingleMarkTemplate,
        {  
            build: function() {
                SingleLandmarkRevTemplateClass.superclass.build.call(this);

                const btnAdd = document.querySelector('#btnAdd');
                const reviewResults = document.querySelector('#reviewResults');

                btnAdd.addEventListener('click', function(e) {
                    e.preventDefault();

                    const coordinates = yandexMap.balloon.getPosition();
                    const balloonData = yandexMap.balloon.getData();
                    const review = getReviewObject();
                    const newMark = createNewMark({
                        coordinates: coordinates,
                        review: review,
                        location: balloonData.location
                    }, SingleLandmarkRevTemplateClass);

                    reviewResults.appendChild(getReviewNode(review));                                        
                    //  yandexMap.geoObjects.add(newMark);
                    clusterer.add(newMark);
                    console.log(ymaps.geoQuery(ymaps.geocode(balloonData.location)))
                  
                });
            },
            clear: function () {
                //btnAdd.removeEventListener('click',);
                SingleLandmarkRevTemplateClass.superclass.clear.call(this);
            },    

        }
    );
    
    yandexMap.events.add('click', (e) => {
        const coordinates = e.get('coords');
        const geocode = ymaps.geocode(coordinates, {bresults: 1 });

        geocode.then(function (res) {
            const locationName = res.geoObjects.get(0).properties.get('name');

            yandexMap.balloon.open(coordinates, {
                location: locationName,
                coordinates: coordinates,
                reviews: []
            },{               
                contentLayout: SingleLandmarkRevTemplateClass
            });                           
        });                                       
    }); 
}

function getReviewObject() {
    const txtAuthor = document.querySelector('#txtAuthor');
    const txtLocation = document.querySelector('#txtLocation');
    const txtDescription = document.querySelector('#txtDescription');

    const review = {
        author: txtAuthor.value,
        location: txtLocation.value,
        description: txtDescription.value
    };

    txtAuthor.value = '';
    txtLocation.value = '';
    txtDescription.value = '';

    return review;
}

function getReviewNode(review) {
    const reviewNode = document.createElement('DIV');
    
    reviewNode.innerHTML = `<p>${review.author} -${review.location} <p><p>${review.description}<p>`;

    return reviewNode;
}

function createNewMark(data, template) {
    const mark = new ymaps.Placemark(data.coordinates, {
        coordinates: data.coordinates,
        location: data.location,
        review: data.review,
        
    }, { balloonContentLayout: template });

    return mark;
}

function checkForCluster(map, coordinates) {

}