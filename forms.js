// JSON data

var data = [{
  "tag": "input",
	"name": "first_name",
  "type": "text",
	"human_label": "First Name"
}, {
  "tag": "input",
  "name": "last_name",
  "type": "text",
	"human_label": "Last Name"
}, {
  "tag": "input",
  "name": "email",
  "type": "email",
  "human_label": "Email Address"
}, {
  "tag": "input",
  "name": "phone_number",
  "type": "text",
  "human_label": "Phone Number"
}, {
  "tag": "input",
  "name": "job_title",
  "type": "text",
  "human_label": "Job Title"
}, {
  "tag": "input",
  "name": "date_of_birth",
  "type": "date",
  "human_label": "Date of Birth"
}, {
  "tag": "input",
  "name": "parental_consent",
  "type": "checkbox",
  "human_label": "Parental Consent",
	"conditional": {
		"name": "date_of_birth",
		"show_if": (value) => {
      const now = new Date();
			return value >= new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());}
}
}]


var form = document.createElement("form");
form.setAttribute("method","post");
form.setAttribute("action", " ");


for (var row in data) {
    if ("conditional" in data[row]) {
    var label = document.createElement("label");
    label.innerHTML = data[row].human_label + ": ";
    label.style.visibility = "hidden";
    var element = document.createElement(data[row].tag);
    element.type = data[row].type;
    element.name = data[row].name;
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
            element.name = data[row].name;
            element.className = "form-control";
            element.addEventListener("change", function(){
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
            element.className = "form-control";
            var br = document.createElement("br");
            form.appendChild(label);
            form.appendChild(element);
            form.appendChild(br);
    }
}}

var s = document.createElement("input");
s.type = "button";
s.name = "submit";
s.value = "Submit";
s.className = "btn btn-primary";

form.appendChild(s);

document.getElementsByTagName("body")[0].className = "container-sm";
document.getElementsByTagName("body")[0].appendChild(form);
