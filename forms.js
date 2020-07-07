// JSON data

var data = [{
  "tag": "input",
  "name": "first_name",
  "required": "",
  "type": "text",
	"human_label": "First Name"
}, {
  "tag": "input",
  "name": "last_name",
  "required": "",
  "type": "text",
	"human_label": "Last Name"
}, {
  "tag": "input",
  "name": "email",
  "required": "",
  "type": "email",
  "human_label": "Email Address"
}, {
  "tag": "input",
  "name": "phone_number",
  "required": "",
  "type": "text",
  "human_label": "Phone Number"
}, {
  "tag": "input",
  "name": "job_title",
  "required": "",
  "type": "text",
  "human_label": "Job Title"
}, {
  "tag": "input",
  "name": "date_of_birth",
  "required": "required",
  "type": "date",
  "human_label": "Date of Birth"
}, {
  "tag": "input",
  "name": "parental_consent",
  "required": "required",
  "type": "checkbox",
  "human_label": "Parental Consent",
	"conditional": {
		"name": "date_of_birth",
		"show_if": (value) => {
	        const now = new Date();
                var value = new Date(value);
        	return value >= new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());}
}
}]


// Create the form object.
var form = document.createElement("form");
form.setAttribute("method","post");
form.setAttribute("action", "#");

//Create the form fields.
for (var row in data) {
    if ("conditional" in data[row]) {
    var label = document.createElement("label");
    label.innerHTML = data[row].human_label + ": ";
    label.style.visibility = "hidden";
    var element = document.createElement(data[row].tag);
    element.type = data[row].type;
    element.name = data[row].name;
    element.required = data[row].required;
    element.style.visibility = "hidden";
    element.className = "form-control";
    var br = document.createElement("br");
    form.appendChild(label);
    form.appendChild(element);
    form.appendChild(br);
    }
    else if (!("conditional" in data[row])) {
            if (data[row]["name"] === "date_of_birth") {
            var label = document.createElement("label");
            label.innerHTML = data[row].human_label + ": ";
            var element = document.createElement(data[row].tag);
            element.type = data[row].type;
            element.required = true; //data[row].required;
            element.name = data[row].name;
            element.className = "form-control";
            element.addEventListener("change", function() { // check the return value of date_of_birth field to make the parental checkbox visible or not.
		 if (data[row]["conditional"]["show_if"](this.value) === true) {
		 var element = document.getElementsByTagName("input")[6]; 
                 element.style.visibility = "visible"; 
                 var label = document.getElementsByTagName("label")[6]; 
                 label.style.visibility = "visible";}});
            var br = document.createElement("br");
            form.appendChild(label);
            form.appendChild(element);
            form.appendChild(br);
            }
	    else {
            var label = document.createElement("label");
            label.innerHTML = data[row].human_label + ": ";
            var element = document.createElement(data[row].tag);
            element.type = data[row].type;
            element.name = data[row].name;
            element.required = data[row].required;
            element.className = "form-control";
            var br = document.createElement("br");
            form.appendChild(label);
            form.appendChild(element);
            form.appendChild(br);
    }
}}



// create a submit button.
var submitButton = document.createElement("input");
submitButton.type = "submit";
submitButton.name = "submit";
submitButton.value = "Submit";
submitButton.className = "btn btn-primary btn-block";
form.appendChild(submitButton);


// Form data serializer
(function() {
	function toJSONString(form) {
		var obj = {};
		var elements = form.querySelectorAll("input, select, textarea");
		for( var i = 0; i < elements.length; ++i ) {
			var element = elements[i];
			var name = element.name;
			var value = element.value;

			if( name ) {
				obj[ name ] = value;
			}
		}

		return JSON.stringify( obj );
	}

	document.addEventListener("DOMContentLoaded", function() {
		var form = document.getElementsByTagName("form")[0];
		var output = document.getElementById("output");
		form.addEventListener("submit", function(e) {
			e.preventDefault();
			var json = toJSONString(this);
			output.innerHTML = json;
			form.onsubmit = async (e) => {
    				e.preventDefault();

    				let response = await fetch('Server endpoint', { // Server endpoint
      					method: 'POST',
      					body: new FormData(form)
    			});

    		let result = await response.json();

    		alert(result.message);
  	};

		}, false);

	});

})();

document.getElementsByTagName("body")[0].className = "container-sm";
document.getElementsByTagName("body")[0].appendChild(form);
