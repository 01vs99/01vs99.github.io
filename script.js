document.addEventListener("DOMContentLoaded", function () {
    populateDropdown("province",  provinces.filter(city => !city.parent));
    document.getElementById("province").addEventListener("change", updateCities);
    document.getElementById("city").addEventListener("change", updateDistricts);
    updateCities()
});

function populateDropdown(elementId, data) {
    const dropdown = document.getElementById(elementId);
    dropdown.innerHTML = "";
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.value;
        option.textContent = item.name;
        dropdown.appendChild(option);
    });
}

function updateCities() {
    const selectedProvince = document.getElementById("province").value;
    const cities = provinces.filter(city => city.parent === selectedProvince);
    populateDropdown("city", cities);
    updateDistricts();
}

function updateDistricts() {
    const selectedCity = document.getElementById("city").value;
    const districts = provinces.filter(district => district.parent === selectedCity);
    populateDropdown("district", districts);
}

function submitForm() {
    const formData = {
        certName: document.getElementById("certName").value,
        certNo: document.getElementById("certNo").value,
        contactNum: document.getElementById("contactNum").value,
        postProvince: document.getElementById("province").options[document.getElementById("province").selectedIndex].text,
        postCity: document.getElementById("city").options[document.getElementById("city").selectedIndex].text,
        postDistrict: document.getElementById("district").options[document.getElementById("district").selectedIndex].text,
        postAddr: document.getElementById("postAddr").value,
        postProvinceCode: document.getElementById("province").value,
        postCityCode: document.getElementById("city").value,
        postDistrictCode: document.getElementById("district").value
    };

    const jsonOutput = document.getElementById("jsonOutput");
    jsonOutput.textContent = JSON.stringify(formData, null, 2);

    openModal();
}

function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function copyToClipboard() {
    const jsonOutput = document.getElementById("jsonOutput");
    const range = document.createRange();
    range.selectNode(jsonOutput);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("JSON copied to clipboard!");
}
