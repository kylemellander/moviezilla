describe("ApiData", function() {

  it("creates the data for sending to onConnect API", function() {
    var apiDataTest = new ApiData("97220");
    expect(apiDataTest.zip).to.equal("97220");
    expect(apiDataTest.api_key).to.equal("ez3mx4r7skrxpe9au2y8bpgn")
  })
})

describe("ApiAjax", function(){
  it('creates the query send off to ajax', function (){
    var apiAjaxTest = new ApiAjax("97220");
    expect(apiAjaxTest.url).to.equal("http://data.tmsapi.com/v1.1/movies/showings");
    expect(apiAjaxTest.data.zip).to.equal("97220");
  })
})
