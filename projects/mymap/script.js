$(document).ready(function () {

    localStorage.removeItem('b24-form-field-stored-values');

    const center = [55.15336493240549, 61.39170200000001];



    function getQueryVar(variable) {
        let queryArr = [];
        location.search
            .substring(1)
            .split('&')
            .forEach((item)=> {
                let param = item.split('=');
                queryArr[param[0]] = param[1];
                }
            );
        return queryArr[variable];

    }

    const urlObjID = getQueryVar('id');








    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 15,
        freeMode: true,
        grabCursor: true,
        autoplay: true,
        delay: 6000,
        //loop: true,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    ymaps.ready(function makeMap() {


            const panel = document.querySelector('#panel');
            const blackBg = document.querySelector('.black-bg');
            const close = document.querySelector('.close');


            const sMap = new ymaps.Map("sMap", {
                    center: center,
                    zoom: 11,
                    controls: ["zoomControl", "geolocationControl", "searchControl"]
                }),

                objectManager = new ymaps.ObjectManager({
                    // Чтобы метки начали кластеризоваться, выставляем опцию.
                    clusterize: true,
                    // ObjectManager принимает те же опции, что и кластеризатор.
                    gridSize: 64,
                    // Макет метки кластера pieChart.
                    clusterIconLayout: "default#pieChart"
                });

            sMap.geoObjects.add(objectManager);

            function getPlacemarkType(typeFromJSON) {
                switch (typeFromJSON) {
                    case "69":
                        return "Любимое место";
                        break;

                    case "51":
                        return "Незавершенное строительство";
                        break;

                    case "47":
                        return "Пожелание";
                        break;

                    default:
                        return "Обычная";
                        break;
                }

            }

            function getPlacemarkPreset(type) {
                switch (type) {
                    case "Любимое место":
                        return "islands#redHeartIcon";
                        break;

                    case "Незавершенное строительство":
                        return "islands#orangeWasteIcon";
                        break;

                    case "Пожелание":
                        return "islands#pinkAttentionIcon";
                        break;

                    default:
                        return "islands#darkBlueCircleDotIcon";
                        break;
                }
            }


            let myGeoObjects = [];

            $.ajax({
                method: "GET",
                url: "objects.json",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    formObjects(data);
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        alert('Not connect. Verify Network.');
                    } else if (jqXHR.status == 404) {
                        alert('Requested page not found (404).');
                    } else if (jqXHR.status == 500) {
                        alert('Internal Server Error (500).');
                    } else if (exception === 'parsererror') {
                        alert('Requested JSON parse failed.');
                    } else if (exception === 'timeout') {
                        alert('Time out error.');
                    } else if (exception === 'abort') {
                        alert('Ajax request aborted.');
                    } else {
                        alert('Uncaught Error. ' + jqXHR.responseText);
                    }
                }
            });

            // Формируем объекты карты
            function formObjects(data) {
                let id = 0;
                for (let k = 0, len = data.length; k < len; k++) {

                    if (data[k]["valid"] == 1) {
                        let objId = data[k]["id"];
                        let address = data[k]["address"] || "не указано";
                        let title = data[k]["title"] || "не указано";
                        let coords = data[k]["coords"];
                        if (coords.length < 2) {
                            continue;
                        }
                        let color = data[k]["color"];
                        let dateEnd = data[k]["date"] || "не указано";
                        let dev = data[k]["dev"] || "не указано";
                        let pointType = data[k]["pointType"] || "не указано";
                        let desc = data[k]["desc"] || "не указано";
                        let images = data[k]["images"] || false;
                        let likes = data[k]["likes"] || [0,0];


                        let placemarkType = getPlacemarkType(pointType);
                        let presetType = getPlacemarkPreset(placemarkType)

                        let hintContentStr =
                            '<div style="padding: 10px 20px;"><h3>' +
                            address +
                            "</h3><p><b>Тип отметки:</b> " +
                            placemarkType +
                            "</p></div>";

                        let listContentStr =
                            "<span style=\"display: none\" data-id=" + objId +"></span>" +
                            "<div class=\"desc-bg\"><div class=\"desc__meta-block\">" +
                            "<div class=\"desc__submeta-block\">" +
                            "<svg class = \"panel__icon address_icon\">\n" +
                            "   <use xlink:href=\"#address\"></use>\n" +
                            "</svg>" +
                            "<span class=\"desc__meta\">Адрес: </span>" +
                            "</div>" +
                            "<span class=\"desc__address\"> " +
                            address +
                            "</span>" +
                            "</div>" +
                            "" +
                            "<div class=\"desc__meta-block\">" +
                            "<div class=\"desc__submeta-block\">" +
                            "  <svg class = \"panel__icon\">\n" +
                            "  <use xlink:href=\"#house\"></use>\n" +
                            "  </svg>\n<span  class=\"desc__meta\">Тип отметки: </span> " +
                            "</div>" +
                            "<span class=\"desc__placemarkType\"> " +
                            placemarkType +
                            "</span>" +
                            "</div>" +
                            "" +
                            "<div class=\"desc__meta-block\">  " +
                            "<svg class = \"panel__icon comment_icon\">\n" +
                            "<use xlink:href=\"#comment\"></use>\n" +
                            "</svg><span  class=\"desc__meta\">Комментарий: </span><br> " +
                            "</div>" +
                            "<div class=\"comment\"> " +
                            "<svg class = \"panel__icon quote\">\n" +
                            "<use xlink:href=\"#quote\"></use>\n" +
                            "</svg>\n" +
                            desc +
                            "</div>" +
                            "<div class=\"panel-bottom\">" +
                            "<div class=\"reactions\">" +
                            "<div class=\"like__wrap\" data-reaction = \"like\">\n" +
                            "<svg class=\"like__icon\">\n" +
                            "<use xlink:href=\"#like1\"></use>" +
                            "</svg>" +
                            "</div>" +
                            "<p class=\"countLikes likedNum\">" +
                            likes[0] +
                            "</p>" +
                            "<div class=\"like__wrap\" data-reaction = \"dislike\">" +
                            "<svg class=\"like__icon dislike\">" +
                            "<use xlink:href=\"#like1\"></use>" +
                            "</svg>" +
                            "</div>" +
                            "<p class=\"countLikes dislikedNum\">" +
                            likes[1] +
                            "</p>" +
                            "</div>" +
                            "</div>" +
                            "</div>";


                        // Функция генерации слайдера для объекта из массива URL полученного из JSON
                        function generateSlider(urlArr) {
                            console.log("generating");
                            if (urlArr) {
                                console.log("doin it");
                                for (i = 0; i < urlArr.length; i++) {
                                    imgUrl = urlArr[i];

                                    // Создаем структуру слайда
                                    slide = document.createElement('div');
                                    slide.setAttribute('class', 'img__wrap  swiper-slide');
                                    img = document.createElement('img');
                                    img.setAttribute('class', 'obj__image');
                                    img.setAttribute('data-fancybox', 'gallery');
                                    img.setAttribute('src', imgUrl);
                                    img.setAttribute('alt', 'Изображение объекта');
                                    slide.append(img);

                                    slider = document.querySelector('.swiper-wrapper');
                                    // Добавляем слайд к контейнеру слайдера
                                    slider.append(slide);
                                }
                            }
                        }

                        function clearSlider() {
                            slider = document.querySelector('.swiper-wrapper');
                            while (slider.firstChild) slider.removeChild(slider.firstChild);
                        }


                        objectManager.add({
                                type: 'Feature',
                                id: objId,
                                geometry: {
                                    type: "Point",
                                    coordinates: coords,
                                },
                                properties: {
                                    balloonContentFooter: listContentStr,
                                    balloonContentHeader: title,
                                    iconHint: title,
                                    iconCaption: title,
                                    hintContent: hintContentStr,
                                    // Здесь создаем кастомное свойство объекта с массивом URL для картинок
                                    images: images,
                                    pointType: placemarkType
                                },
                                options: {
                                    preset: presetType
                                },
                            }
                        )


                        if (urlObjID == objId) {

                            const obj = objectManager.objects._objectsById[objId];

                            sMap.setCenter(obj.geometry.coordinates);
                            sMap.setZoom(17);

                            formObjectFromUrl(obj);

                        }

                    }
                }

                objectManager.objects.options.set({
                    openBalloonOnClick: false
                });

                objectManager.clusters.options.set({
                    hasBalloon: false,
                    openBalloonOnClick: false

                });



                function liked(likeBtn) {
                    likeBtn.forEach((e) => {

                        e.addEventListener('click', (e) => {

                            e = e.target;
                            const id = document.querySelector('[data-id]').getAttribute('data-id');
                            const targetLikeBtn = e.closest('.like__wrap');
                            let countLikes = +targetLikeBtn.nextSibling.textContent;
                            const userLikesJson = localStorage.getItem('userInfo');



                            if (targetLikeBtn.classList.contains('liked')) {
                                targetLikeBtn.classList.remove('liked');

                                if (userLikesJson) {
                                    const userLikes = JSON.parse(userLikesJson);

                                    for (let i = 0; i < userLikes.length; i++) {
                                        if (userLikes[i].id === id) {
                                            userLikes.splice(i, 1);
                                        }
                                        writeToLocalStorage(userLikes);
                                    }
                                }



                                if(targetLikeBtn.getAttribute('data-reaction') == 'like') {

                                    sendLike({
                                        "state": "unset",
                                        "id": id,
                                        "reaction": "like"
                                    });
                                } else {
                                    sendLike({
                                        "state": "unset",
                                        "id": id,
                                        "reaction": "dislike"
                                    });
                                }

                                countLikes -= 1;
                                targetLikeBtn.nextSibling.textContent = countLikes;

                            } else {
                                undoLikes(id);
                                cleanLikes(likeBtn);

                                targetLikeBtn.classList.add('liked');



                                if(targetLikeBtn.getAttribute('data-reaction') == 'like') {
                                    personalizeReaction(id, 'like');
                                    sendLike({
                                        "state": "set",
                                        "id": id,
                                        "reaction": "like"
                                    });
                                } else {
                                    personalizeReaction(id, 'dislike');
                                    sendLike({
                                        "state": "set",
                                        "id": id,
                                        "reaction": "dislike"
                                    });
                                }
                                countLikes += 1;
                                targetLikeBtn.nextSibling.textContent = countLikes;

                            }


                        })
                    })
                }

                //Функция снимает класс лайка со всех кнопок, при клике по ним, для обновления
                function cleanLikes(likeBtn) {
                    likeBtn.forEach((e) => {
                        e.classList.remove('liked');
                    });

                }

                // Функция, которая при клике по другой кнопке, снимает лайк с первой
                function undoLikes(id) {
                    const reactions = document.querySelector('.reactions');
                    const liked = reactions.querySelector('.liked');
                    if(liked) {
                        const usedBtn = reactions.querySelector(".like__wrap.liked");
                        let countLikes = +usedBtn.nextSibling.textContent;
                        countLikes -= 1;
                        usedBtn.nextSibling.textContent = countLikes;

                        if(usedBtn.getAttribute('data-reaction') == 'like') {

                            sendLike({
                                "state": "unset",
                                "id": id,
                                "reaction": "like"
                            });
                        } else {
                            sendLike({
                                "state": "unset",
                                "id": id,
                                "reaction": "dislike"
                            });
                        }
                    }
                }

                function sendLike(data) {
                    $.ajax({
                        method: "POST",
                        url: "reactions.php",
                        dataType: "JSON",
                        data: data,
                        success: function (data) {
                            //console.log(data);
                            // formObjects(data);
                        },
                        error: function (jqXHR, exception) {
                            if (jqXHR.status === 0) {
                                alert('Not connect. Verify Network.');
                            } else if (jqXHR.status == 404) {
                                alert('Requested page not found (404).');
                            } else if (jqXHR.status == 500) {
                                alert('Internal Server Error (500).');
                            } else if (exception === 'parsererror') {
                                alert('Requested JSON parse failed.');
                            } else if (exception === 'timeout') {
                                alert('Time out error.');
                            } else if (exception === 'abort') {
                                alert('Ajax request aborted.');
                            } else {
                                alert('Uncaught Error. ' + jqXHR.responseText);
                            }
                        }
                    });

                }

                function personalizeReaction(id, reaction) {

                    let newObj = true;
                    const reactionInfo = {
                        id,
                        reaction
                    };

                    if (!localStorage.getItem('userInfo')) {
                        localStorage.setItem('userInfo', "[]");
                    }

                    const existingUserJson = localStorage.getItem('userInfo');

                    let existingUserInfo = JSON.parse(existingUserJson);


                    if (existingUserInfo.length) {
                        for (let i = 0; i < existingUserInfo.length; i++) {

                            if (existingUserInfo[i].id == id) {
                                existingUserInfo[i].reaction = reaction;
                                newObj = false;
                                break;
                            }
                        }

                    } else {
                        existingUserInfo.push(reactionInfo);
                        newObj = false;
                    }
                    if (newObj) {
                        existingUserInfo.push(reactionInfo);
                    }
                            writeToLocalStorage(existingUserInfo);


                    }


                function writeToLocalStorage(data) {

                    let userJson = JSON.stringify(data);
                    localStorage.setItem('userInfo', userJson);

                }



                function formObjectFromUrl(object) {
                    const data__name = object.properties.balloonContentHeader;
                    console.log(data__name);
                    const obj__name = document.querySelector('.panel .obj__name');
                    obj__name.innerHTML = data__name;

                    const data__desc = object.properties.balloonContentFooter;
                    const obj__desc = document.querySelector('.panel .obj__desc');
                    obj__desc.innerHTML = data__desc;

                    const userLikesJson = localStorage.getItem('userInfo');
                    const id = document.querySelector('[data-id]').getAttribute('data-id');

                    if (userLikesJson) {
                        const userLikes = JSON.parse(userLikesJson);

                        for (let i = 0; i < userLikes.length; i++) {
                            if (userLikes[i].id === id) {
                                if (userLikes[i].reaction == 'like') {
                                    document.querySelector('[data-reaction="like"]').classList.add('liked');
                                } else {
                                    document.querySelector('[data-reaction="dislike"]').classList.add('liked');
                                }

                            }
                        }
                    }


                    panel.classList.add('active');
                    blackBg.classList.add('active');
                    images = object.properties.images;
                    const likeBtn = document.querySelectorAll('.like__wrap');
                    liked(likeBtn);
                    // Передаем массив из кастомного свойства в функцию генерации слайдера
                    generateSlider(images);
                }



                sMap.geoObjects.events.add("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    const object = e.get("target");
                    const objectId = e.get('objectId');

                    if (object.options._parent._name == "clusterCollection") {
                        console.log('cluster');

                    } else {

                        const data__name = object._overlaysById[objectId]._data.properties.balloonContentHeader;
                        console.log(data__name);
                        const obj__name = document.querySelector('.panel .obj__name');
                        obj__name.innerHTML = data__name;

                        const data__desc = object._overlaysById[objectId]._data.properties.balloonContentFooter;
                        const obj__desc = document.querySelector('.panel .obj__desc');
                        obj__desc.innerHTML = data__desc;

                        const userLikesJson = localStorage.getItem('userInfo');
                        const id = document.querySelector('[data-id]').getAttribute('data-id');

                        history.pushState(null, null, '?' + 'id=' + objectId);

                        if (userLikesJson) {
                            const userLikes = JSON.parse(userLikesJson);

                            for (let i = 0; i < userLikes.length; i++) {
                                if (userLikes[i].id === id) {
                                    if (userLikes[i].reaction == 'like') {
                                        document.querySelector('[data-reaction="like"]').classList.add('liked');
                                    } else {
                                        document.querySelector('[data-reaction="dislike"]').classList.add('liked');
                                    }

                                }
                            }
                        }


                        panel.classList.add('active');
                        blackBg.classList.add('active');
                        images = object._overlaysById[objectId]._data.properties.images;
                        const likeBtn = document.querySelectorAll('.like__wrap');
                        liked(likeBtn);
                        // Передаем массив из кастомного свойства в функцию генерации слайдера
                        generateSlider(images);

                    }
                });

                // Очищаем слайдер и убираем панель и темный фон
                blackBg.addEventListener('click', () => {
                    hidePanel();
                });

                close.addEventListener('click', () => {
                    hidePanel();
                });


                function hidePanel() {
                    panel.classList.remove('active');
                    blackBg.classList.remove('active');
                    history.pushState(null, null, window.location.pathname);
                    clearSlider();
                }


                let clusterer = new ymaps.Clusterer({
                    clusterDisableClickZoom: false,
                    preset: 'islands#lightBlueClusterIcons',
                    gridSize: 80,
                    groupByCoordinates: false,
                    maxZoom: 12,
                });

                sMap.geoObjects.add(objectManager);





            }

            function filterObjects() {
                checkboxes = document.querySelectorAll('.filters__item input');

                let filters = {
                    "Любимое место": true,
                    "Пожелание": true,
                    "Незавершенное строительство": true,
                    "Обычная": true
                }

                checkboxes.forEach((e) => {
                        e.addEventListener('change', function (e) {
                                checkbox = e.target;
                                console.log(checkbox);
                                let filter = checkbox.getAttribute('data-pointtype');
                                let parent = checkbox.closest(".filters__item");


                                if (checkbox.checked) {
                                    console.log('checked')

                                    filters[filter] = true;
                                    // Применим фильтр.
                                    objectManager.setFilter(getFilterFunction(filters));
                                    parent.classList.remove('panel__checked');
                                    console.log(checkbox.checked);


                                } else {
                                    console.log('unchecked')
                                    filters[filter] = false;
                                    // Применим фильтр.
                                    objectManager.setFilter(getFilterFunction(filters));
                                    parent.classList.add('panel__checked');
                                    console.log(checkbox.checked);

                                }
                            }
                        )
                    }
                )
            }


            function getFilterFunction(categories) {
                return function (obj) {
                    var content = obj.properties.pointType;
                    return categories[content]
                }
            }

            filterObjects();


        }
    );



})