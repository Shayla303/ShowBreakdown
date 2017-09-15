
var endpoint=  "http://api.tvmaze.com/singlesearch/shows?q="
var findShow = document.getElementById('search-input').value;
var form = document.getElementById('showform');
var showDisplay =  document.getElementsByClassName('card-container')[0]



form.addEventListener('submit',function(event) {
  event.preventDefault();
  showDisplay.innerText = "";
  var showSearch = event.target.elements.search1.value;
  var showUrl = endpoint + showSearch;
  // console.log(showUrl);
  getShowInfo(showSearch);
});


function getShowInfo(showSearch){
  fetch("http://api.tvmaze.com/singlesearch/shows?q="+showSearch+"&embed=episodes")
    .then(function(response){
      return response.json()
      .then(function(showData){
        console.log(showData)
        console.log(showData._embedded.episodes.length)
        for (var i=0; i<showData._embedded.episodes.length; i++){
          var card = document.createElement ('article')
          card.setAttribute('class','card');
          showDisplay.append(card)
          // var img = document.createElement("img")
          var imageDiv= document.createElement('div')
          imageDiv.setAttribute('class','card-img')
          // imageDiv.setAttribute('id', 'cardClass')
          card.append(imageDiv)
          var getImage = document.getElementsByClassName("card-img")[i]
          if (showData._embedded.episodes[i].image != null) {
            getImage.style.backgroundImage="url("+ showData._embedded.episodes[i].image.medium +")"

          }


          var bodyDiv =document.createElement('div')
          bodyDiv.setAttribute('class', 'card-body');
          card.append(bodyDiv)
          var oneDiv= document.createElement('div')
          oneDiv.setAttribute('class', 'one')
          bodyDiv.append(oneDiv)

          var episodeName= document.createElement('h3')
          episodeName.setAttribute('class', 'name')
          episodeName.innerText = showData._embedded.episodes[i].name

          var airDate= document.createElement('p')
          airDate.setAttribute('class', 'date')
          airDate.innerText = showData._embedded.episodes[i].airdate
          oneDiv.append(episodeName,airDate)


          var twoDiv= document.createElement('div')
          twoDiv.setAttribute('class', 'two')
          bodyDiv.append(twoDiv)

          var showLinkContainer = document.createElement('div')
          showLinkContainer.setAttribute('class', 'card-link-container')
          twoDiv.append(showLinkContainer)

          var showLink= document.createElement('a')
          showLink.setAttribute('class','card-link')
          showLink.setAttribute('href','#')
          showLink.innerText= showData._embedded.episodes[i].url
          showLinkContainer.append(showLink)


          var threeDiv= document.createElement('div')
          threeDiv.setAttribute('class', 'three')
          bodyDiv.append(threeDiv)

          var episodeSummary = document.createElement('p');
          episodeSummary.setAttribute('id', 'playlist')
          episodeSummary.innerText= showData._embedded.episodes[i].summary
          threeDiv.append(episodeSummary)




          var episodeSeason = document.createElement('p');
          var episodeNumber = document.createElement('p');


          // episodeSummary.textContent = showData.Episodes[i].Summary
          // showDisplay.append(episodeSummary)
          //
          // episodeSeason.textContent= showData.Episodes[i].Season
          // showDisplay.append(episodeSeason)
          //
          // episodeNumber.textContent= showData.Episodes[i].Number
          // showDisplay.append(episodeNumber)
    }
  })
});
}
