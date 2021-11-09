// returns 10 news stories (optional: able to load more) based on set space-related criteria.
// uses the newsapi
// TO DO: make route to newsapi

import { ArticlesEntity } from "../models/NewsInterface";

// used type "any" to avoid errors, but switch back to "ArticlesEntity" when retrieving all the data.
export default function NewsFeed({ title, url, description, content, publishedAt, image }: ArticlesEntity) {

    return (
        <div className="info-card newsfeed-card">
            <div className="newsfeed-div">
                <img className="newsfeed-pix" src={image} />
                <div className="newsfeed-text">
                    <p className="newsfeed_title">{title}</p>
                    <p className="newsfeed_content">{description}</p>
                    <a href={url} className="newsfeed_url">Click to read full story</a>
                </div>
            </div>
        </div>
        // <div className="info-card newsfeed-card">
        //         <div className="newsfeed-div"><img className="newsfeed-pix" src={image} /></div>
        //         <p className="newsfeed_title">{title}</p>
        //         <details>
        //             <summary>More Details</summary>
        //             <a href={url} className="newsfeed_url">Click to read full story</a>
        //             <p className="newsfeed_content">{description}</p>
        //         </details>
        // </div>
    )



}




// // newsapi key
// //  01506b975fb14e549a407f6016bb935b
// // https://newsapi.org/v2/everything?domains=nasa.gov&apiKey=01506b975fb14e549a407f6016bb935b
// // https://newsapi.org/


// gnews
// key: b1699b1b5b5eaa294a088cd7eb40de6a