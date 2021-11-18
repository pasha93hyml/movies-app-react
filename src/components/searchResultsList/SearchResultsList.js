import "./searchResultsList.css";

const SearchResultsList = ({data}) => {

  const renderItems = (items) => {
    return items.map((item, i) => {
      return (
        <div key={i} className="col">
          <div className="card">
            <div className="card-ref">
              <img
                src={item.imgUrl}
                className="card-img-top"
                alt={item.title}
                height="300"
              />
              <div className="card-body">
                <p className="card-title">{item.title}</p>
                <p className="card-text">{item.release_date}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
    const markup = renderItems(data);
    return (
        <div className="container">
          <div className={data.length > 5 ? 'row row-cols-1 row-cols-md-5 g-4' : `row row-cols-1 row-cols-md-${data.length} g-4`}>
            {markup}
          </div>
        </div>
    );
  
}

export default SearchResultsList;
