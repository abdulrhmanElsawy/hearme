import './css/searchbar.css';

function SearchBar(props){

const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const tableRows = document.getElementsByTagName("tr");

    for (let i = 0; i < tableRows.length; i++) {
    const row = tableRows[i];
    const rowData = row.textContent.toLowerCase();

    if (rowData.includes(searchValue)) {
        row.style.display = "";
    } else {
        row.style.display = "none";
    }
    }
}

return(
    <>
    <div className={`${props.className} search-bar`}>
        <button className='search-btn'> <i class="las la-search"></i> </button>
        <input type='text' placeholder='Search....' name='search' onChange={handleSearch} />
    </div>
    </>
)
}

export default SearchBar;
