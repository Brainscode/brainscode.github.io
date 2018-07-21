var url_string = window.location.href
var url = new URL(url_string);
var name = url.searchParams.get("name");
// console.log(c);
document.getElementById("name").innerHTML = name.toUpperCase();
var database = firebase.database().ref('/');
database.child("members").child(name).once("value", (data) => {
    var user = data.val();
    // creating header data in html
    createHeader(user);

    // rendering education in html file 
    var education = document.getElementById("timeline-education");
    user.EDUCATION.map((val) => {
        // using createTimeline 
        return education.appendChild(createTimeline(val));
        // console.log(education,val.description)
    });

    // rendering experience in html file 
    var experience = document.getElementById("timeline-experience");
    user.EXPERIENCE.map((val) => {
        // using createTimeline 
        return experience.appendChild(createTimeline(val));
    });


    // rendering skills in html file

    var skills = document.getElementById("skills-div");
    Object.keys(user.SKILLS).map((key) => {
        skills.appendChild(createSkill(user.SKILLS[key], key));
    })
    console.log(data.val());
});

function createElement(name, obj, child = "undefined") {
    let ele = document.createElement(name);
    Object.keys(obj).map((key) => {
        ele.setAttribute(key, obj[key]);
    });
    if (child !== "undefined") {

        if (typeof (child) === "string" || typeof (child) === "number") {
            let text = document.createTextNode(child);
            ele.appendChild(text);
        } else {
            ele.appendChild(child);
        }
    }
    return ele;
}


// creating header data in html function definition

function createHeader(user) {

    var card = document.getElementById("v-card");
    // console.log(createElement("li",{id:"name"},"Salman"));
    // createElement("div", { "class": "container" },

    // );
    card.appendChild(
        // <!-- PROFILE PICTURE -->
        createElement("div", { "id": "profile" },
            createElement("img", { "style": "padding:20px 20px;", "alt": "profile-image", "class": "img-responsive", "src": user.url })
        )
    );

    // <!-- NAME & STATUS -->
    var div = createElement("div", { "class": "card-content" },
        nameStatus(user)
    );
    // <!-- CONTACT INFO -->
    div.appendChild(contactInfo(user))
    // <!--LINKS-->
    div.appendChild(links(user.links));
    card.appendChild(div);
    let objective = document.getElementById("objective");
    objective.appendChild(createElement("p", {}, user.Objective));
}
// creating header data in html function ending




//  <!-- NAME & STATUS -->
function nameStatus(user) {
    let div = createElement("div", { "class": "info-headings" });
    let h4 = createElement("h4", { "class": "text-uppercase left" }, user.Name)
    let h6 = createElement("h6", { "class": "text-capitalize left" }, user.Designation)
    let hr = createElement("h6", { "style": "width: 300px; position: absolute; margin-top: 90px;" })
    div.appendChild(h4)
    div.appendChild(h6)
    div.appendChild(hr)
    return div
}
// console.log(contactInfo())

// <!-- CONTACT INFO -->
function contactInfo(user) {

    let div = createElement("div", { "class": "infos" });
    let ul = createElement("ul", { "class": "profile-list" });
    let li1 = createElement("li", { "class": "clearfix" });
    li1.appendChild(
        createElement("span", { "class": "title" },
            createElement("i", { "class": "material-icons" }, "email")
        )
    );
    li1.appendChild(
        createElement("span", { "class": "content" }, user.Email)
    );

    let li2 = createElement("li", { "class": "clearfix" }, "");
    li2.appendChild(
        createElement("span", { "class": "title" },
            createElement("i", { "class": "material-icons" }, "language")
        )
    );
    li2.appendChild(
        createElement("span", { "class": "content" }, user.Language)
    );
    let li3 = createElement("li", { "class": "clearfix" }, "");
    li3.appendChild(
        createElement("span", { "class": "title" },
            createElement("i", { "class": "material-icons" }, "phone")
        )
    );
    li3.appendChild(
        createElement("span", { "class": "content" }, user.Phone)
    );
    let li4 = createElement("li", { "class": "clearfix" }, "");
    li4.appendChild(
        createElement("span", { "class": "title" },
            createElement("i", { "class": "material-icons" }, "place")
        )
    );
    li4.appendChild(
        createElement("span", { "class": "content" }, user.Place)
    );
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    div.appendChild(ul);
    return div;
}

// <!--LINKS-->
function links(links) {
    let div = createElement("div", { "class": "links" }, "");
    div.appendChild(
        createElement("a", { "href": links.facebook, "id": "first_one", "class": "social btn-floating indigo" },
            createElement("i", { "class": "fa fa-facebook" }, "")
        )
    )
    div.appendChild(
        createElement("a", { "href": links.twitter, "id": "first_one", "class": "social btn-floating blue" },
            createElement("i", { "class": "fa fa-twitter" }, "")
        )
    )
    div.appendChild(
        createElement("a", { "href": links.googleplus, "id": "first_one", "class": "social btn-floating red" },
            createElement("i", { "class": "fa fa-google-plus" }, "")
        )
    )
    div.appendChild(
        createElement("a", { "href": links.linkedin, "id": "first_one", "class": "social btn-floating blue darken-3" },
            createElement("i", { "class": "fa fa-linkedin" }, "")
        )
    )
    return div;
}




// creating timline Div

function createTimeline(Obj) {
    // <!--  TIMELINE -->

    let div = createElement("div", { "class": "timeline-block" })
    // <!-- DOT -->
    let dot = createElement("div", { "class": "timeline-dot" },
        createElement("h6", {}, Obj.dot)
    );

    // <!--TIMELINE CONTENT -- >
    // <div >

    let contentChild = createElement("div", { "class": "card-content" });
    {/*<!-- TIMELINE TITLE -->*/ }
    let title = createElement("h6", { "class": "timeline-title" }, Obj.level);
    contentChild.appendChild(title);
    {/*<!-- TIMELINE TITLE INFO -->*/ }
    let info = createElement("div", { "class": "timeline-info" },
        createElement("h6", {},
            createElement("small", {}, Obj.name)
        )
    );
    info.appendChild(
        createElement("h6", {},
            createElement("small", {}, Obj.period)
        )
    );

    contentChild.appendChild(info);
    let p = createElement("p", {}, Obj.description);
    contentChild.appendChild(p);

    let content = createElement("div", { "class": "card timeline-content" }, contentChild);
    div.appendChild(dot);
    div.appendChild(content);
    return div;
}


// creating skills div

function createSkill(arr, name) {
    let div = createElement("div", { "class": "col-md-4 col-sm-4 col-xs-12" });
    let title = createElement("div", { "class": "skills-title" },
        createElement("h6", { "class": "text-center" }, name)
    );
    div.appendChild(title);
    arr.map((obj) => {
        div.appendChild(createSkillBar(obj));
    });
    return div;
}

// creating skills bar 
function createSkillBar(Obj) {
    let div = createElement("div", { "class": "skillbar", "data-percent": Obj.complete });
    let title = createElement("div", { "class": "skillbar-title" },
        createElement("span", {}, Obj.name)
    );
    let bar = createElement("div", { "class": "skillbar-bar","style":"width: "+ Obj.complete +"; visibility: visible;  -webkit-transform: scale(1); opacity: 1;transform: scale(1); opacity: 1;-webkit-transition: -webkit-transform 1.8s cubic-bezier(0.6, 0.2, 0.1, 1) 0.3s, opacity 1.8s cubic-bezier(0.6, 0.2, 0.1, 1) 0.3s; transition: transform 1.8s cubic-bezier(0.6, 0.2, 0.1, 1) 0.3s, opacity 1.8s cubic-bezier(0.6, 0.2, 0.1, 1) 0.3s;","data-sr-id":"7" });
    let percent = createElement("div", { "class": "skill-bar-percent" }, Obj.complete);
    div.appendChild(title);
    div.appendChild(bar);
    div.appendChild(percent);
    return div;
}
