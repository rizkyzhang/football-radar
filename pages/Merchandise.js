const buildHTML = (image) => `
  <div class="col s12 m6 l4">
    <div class="card hoverable z-depth-2">
      <div class="card-image">
        <img src=${image}>
      </div>
      <div class="card-action">
        <a  href="#" class="full-width btn blue lighten-1 waves-effect waves-light">Buy</a>
      </div>
    </div>
  </div>
`;

const getMerchandiseContent = () => {
  let html = "";

  const images = [
    "../images/shoe1.jpg",
    "../images/shoe2.jpg",
    "../images/shoe3.jpg",
    "../images/shoe4.jpg",
    "../images/shoe5.jpg",
    "../images/shoe6.jpg",
    "../images/shoe7.jpg",
    "../images/ball1.jpg",
    "../images/ball2.jpg",
    "../images/ball3.jpg",
    "../images/ball4.jpg",
    "../images/mask.jpg",
  ];

  images.forEach((image) => {
    html += buildHTML(image);
  });

  return `
    <div class="container">
      <div class="row" style="display:flex;flex-wrap:wrap;align-items:baseline;">
        ${html}
      </div>
    </div>
  `;
};

export default getMerchandiseContent;
