var database = firebase.database().ref('/');
database.child("members").on("child_added", (data) => {
    console.log(data.val(), data.key);
    var key = data.key;
    var obj = data.val();
    var teamDiv = document.getElementById("teamDiv");
    teamDiv.appendChild(createTeamDiv(obj, key));
});



function createTeamDiv(obj, key) {
    let mainDiv = createElement("div", { "class": "col-md-4 col-sm-6 col-xs-12 topic-tile", "style": "text-align:center;" });

    let panel = createElement("div", { "class": "panel panel-default" });
    // image Section
    let img = createElement("a", { "href": "/team/profile.html?name=" + key },
        createElement("div", { "class": "panel-heading topic-bg", "style": "background-color:#1199BA;" },
            createElement("p", { "class": "panel-title" },
                createElement("img", { "class": "img-responsive", "src": obj.url })
            )
        )
    );
    panel.appendChild(img);



    let pBody = createElement("div", { "class": "panel-body" });
    pBody.appendChild(
        createElement("p", { "class": "topic-color" }, obj.Name)
    );
    pBody.appendChild(
        createElement("p", { "class": "title topic-title bold-text" }, obj.Designation)
    );
    //for description ....
    pBody.appendChild(
        createElement("a", { "href": "/team/profile.html?name=" + key, "class": "topic-color" }, "read more ...")
    );
    pBody.appendChild(
        createElement("br",{})
    );
    pBody.appendChild(
        createElement("br",{})
    );
    pBody.appendChild(
        links(obj.links)
        // createElement("p", { "class": "desc topic-desc" }, obj.Email)
    );
    panel.appendChild(pBody);
    mainDiv.appendChild(
        createElement("div", { "class": "fade-in-animation-0" },
            panel
        )
    );
    return mainDiv;

}


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


// <!--LINKS-->
function links(links) {
    let div = createElement("div", { "class": "links" }, "");
    div.appendChild(
        createElement("a", { "href": links.facebook, "id": "first_one", "class": "social btn-floating indigo" },
            createElement("i", { "class": "fa fa-facebook" }, "")
        )
    )
   div.appendChild(
        createElement("p", {"style":"display:inline"}, " "
           
        )
    )
    div.appendChild(
        createElement("a", { "href": links.twitter, "id": "first_one", "class": "social btn-floating blue" },
            createElement("i", { "class": "fa fa-twitter" }, "")
        )
    )
    div.appendChild(
        createElement("p", {"style":"display:inline"}, " "
           
        )
    )
    div.appendChild(
        createElement("a", { "href": links.googleplus, "id": "first_one", "class": "social btn-floating red" },
            createElement("i", { "class": "fa fa-google-plus" }, "")
        )
    )
    div.appendChild(
        createElement("p", {"style":"display:inline"}, " "
           
        )
    )
    div.appendChild(
        createElement("a", { "href": links.linkedin, "id": "first_one", "class": "social btn-floating blue darken-3" },
            createElement("i", { "class": "fa fa-linkedin" }, "")
        )
    )
    return div;
}



