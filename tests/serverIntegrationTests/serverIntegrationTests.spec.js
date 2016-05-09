var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../server.js');

describe('Server and Database Behavior', function () {

  it('should successfully run true tests', function(done){
    expect(true).to.equal(true);
    done();
  });

  describe('GET Request to /getUniqueUrl', function(){

    it('should respond with 200 status', function(done){
      request(app)
        .post('/getUniqueUrl')
        .send(mockObjToSaveInDB)
        .expect(200, done);
    });

    it('should return an object with a uniqueSuffix property', function(done){
      request(app)
        .post('/getUniqueUrl')
        .send(mockObjToSaveInDB)
        .end(function(err, res){
          expect(res.body).to.have.property('uniqueSuffix');
          expect(res.body.uniqueSuffix).to.have.length(7);
          done();
        });
    });

    it('should return a 7 digit unique URL suffix', function(done){
      request(app)
        .post('/getUniqueUrl')
        .send(mockObjToSaveInDB)
        .end(function(err, res){
          expect(res.body.uniqueSuffix).to.have.length(7);
          mockUniqueUrlSuffix = res.body.uniqueSuffix;
          done();
        });
    });
  });

  describe('POST Request to /graphdata', function(){

    it('should respond with 200 status', function(done){
      request(app)
        .post('/graphdata')
        .send({uniqueid: mockUniqueUrlSuffix})
        .expect(200, done);
    });

    it('should respond with 404 status if bad unique URL suffix sent', function(done){
      request(app)
        .post('/graphdata')
        .send({uniqueid: 666})
        .expect(404, done);
    })

    it('should return a DNA string that exactly matches what was sent to /getUniqueUrl', function(done){
      request(app)
        .post('/graphdata')
        .send({uniqueid: mockUniqueUrlSuffix})
        .end(function(err, res){
          expect(res.body.uniqueDNA).to.equal(mockObjToSaveInDB.dna);
          done();
        })
    });

    it('should return a DBN string that exactly matches what was sent to /getUniqueUrl', function(done){
      request(app)
        .post('/graphdata')
        .send({uniqueid: mockUniqueUrlSuffix})
        .end(function(err, res){
          expect(res.body.uniqueDBN).to.equal(mockObjToSaveInDB.dbn);
          done();
        })
    });

    it('should return a DNA string that exactly matches what was sent to /getUniqueUrl', function(done){
      request(app)
        .post('/graphdata')
        .send({uniqueid: mockUniqueUrlSuffix})
        .end(function(err, res){
          expect(res.body.uniqueDNA).to.equal(mockObjToSaveInDB.dna);
          done();
        })
    });

    it('should return nucleotide colors that exactly match those sent to /getUniqueUrl', function(done){
      request(app)
        .post('/graphdata')
        .send({uniqueid: mockUniqueUrlSuffix})
        .end(function(err, res){
          expect(res.body.uniqueAdenine).to.equal(mockObjToSaveInDB.adenineColor);
          expect(res.body.uniqueThymine).to.equal(mockObjToSaveInDB.thymineColor);
          expect(res.body.uniqueCytosine).to.equal(mockObjToSaveInDB.cytosineColor);
          expect(res.body.uniqueGuanine).to.equal(mockObjToSaveInDB.guanineColor);
          done();
        })
    });

    it('should persist node radius, link width, and font family that were sent to /getUniqueUrl', function(done){
      request(app)
        .post('/graphdata')
        .send({uniqueid: mockUniqueUrlSuffix})
        .end(function(err, res){
          expect(res.body.uniqueNodeRadius).to.equal(mockObjToSaveInDB.nodeRadius);
          expect(res.body.uniqueLinkWidth).to.equal(mockObjToSaveInDB.linkWidth);
          expect(res.body.uniqueFontFamily).to.equal(mockObjToSaveInDB.fontFamily);
          done();
        })
    });

  })


});

var mockUniqueUrlSuffix; 

var mockObjToSaveInDB = {
  graphdata: mockGraphData,
  dna: 'AATTGGCCAA',
  dbn: '(....)....',
  adenineColor: 'green',
  thymineColor: 'red',
  cytosineColor: 'blue',
  guanineColor: 'black',
  nodeRadius: 5,
  linkWidth: 13,
  fontFamily: 'Courier'
};

var mockGraphData = {
  "nodes": [
    {
      "nucleotideLetter": "A",
      "color": "green",
      "index": 0,
      "weight": 2,
      "x": 472.54116758313035,
      "y": 222.09807372919263,
      "px": 472.51739109210365,
      "py": 222.0987396596726,
      "fixed": true
    },
    {
      "nucleotideLetter": "A",
      "color": "green",
      "index": 1,
      "weight": 2,
      "x": 476.2905002431369,
      "y": 205.24085404866065,
      "px": 476.27210221522927,
      "py": 205.26102682688878,
      "fixed": true
    },
    {
      "nucleotideLetter": "T",
      "color": "red",
      "index": 2,
      "weight": 2,
      "x": 462.6791321026427,
      "y": 193.61155180070395,
      "px": 462.6805973143785,
      "py": 193.6399609514399,
      "fixed": true
    },
    {
      "nucleotideLetter": "T",
      "color": "red",
      "index": 3,
      "weight": 2,
      "x": 445.1089089726286,
      "y": 195.5910099859337,
      "px": 445.13069818223585,
      "py": 195.61234898511466,
      "fixed": true
    },
    {
      "nucleotideLetter": "G",
      "color": "black",
      "index": 4,
      "weight": 2,
      "x": 442.5380250194189,
      "y": 212.69569687170076,
      "px": 442.5564943473565,
      "py": 212.69978734534692,
      "fixed": true
    },
    {
      "nucleotideLetter": "G",
      "color": "black",
      "index": 5,
      "weight": 3,
      "x": 455.22279940316014,
      "y": 226.37642191787742,
      "px": 455.2201702751991,
      "py": 226.37390213355096,
      "fixed": true
    },
    {
      "nucleotideLetter": "C",
      "color": "blue",
      "index": 6,
      "weight": 2,
      "x": 456.6435154667902,
      "y": 243.89278434142318,
      "px": 456.628135359219,
      "py": 243.87797868333428,
      "fixed": true
    },
    {
      "nucleotideLetter": "C",
      "color": "blue",
      "index": 7,
      "weight": 2,
      "x": 447.5785117617665,
      "y": 258.2261230691175,
      "px": 447.56989865897935,
      "py": 258.2000202412223,
      "fixed": true
    },
    {
      "nucleotideLetter": "A",
      "color": "green",
      "index": 8,
      "weight": 2,
      "x": 430.9916323195914,
      "y": 257.0403298318571,
      "px": 430.99986815233785,
      "py": 257.01790736201826,
      "fixed": true
    },
    {
      "nucleotideLetter": "A",
      "color": "green",
      "index": 9,
      "weight": 1,
      "x": 418.4113972967732,
      "y": 246.22036851512644,
      "px": 418.4324222522007,
      "py": 246.21229122820273,
      "fixed": true
    }
  ],
  "links": [
    {
      "source": {
        "nucleotideLetter": "A",
        "color": "green",
        "index": 0,
        "weight": 2,
        "x": 472.54116758313035,
        "y": 222.09807372919263,
        "px": 472.51739109210365,
        "py": 222.0987396596726,
        "fixed": true
      },
      "target": {
        "nucleotideLetter": "A",
        "color": "green",
        "index": 1,
        "weight": 2,
        "x": 476.2905002431369,
        "y": 205.24085404866065,
        "px": 476.27210221522927,
        "py": 205.26102682688878,
        "fixed": true
      },
      "fixed": true
    },
    {
      "source": {
        "nucleotideLetter": "A",
        "color": "green",
        "index": 1,
        "weight": 2,
        "x": 476.2905002431369,
        "y": 205.24085404866065,
        "px": 476.27210221522927,
        "py": 205.26102682688878,
        "fixed": true
      },
      "target": {
        "nucleotideLetter": "T",
        "color": "red",
        "index": 2,
        "weight": 2,
        "x": 462.6791321026427,
        "y": 193.61155180070395,
        "px": 462.6805973143785,
        "py": 193.6399609514399,
        "fixed": true
      },
      "fixed": true
    },
    {
      "source": {
        "nucleotideLetter": "T",
        "color": "red",
        "index": 2,
        "weight": 2,
        "x": 462.6791321026427,
        "y": 193.61155180070395,
        "px": 462.6805973143785,
        "py": 193.6399609514399,
        "fixed": true
      },
      "target": {
        "nucleotideLetter": "T",
        "color": "red",
        "index": 3,
        "weight": 2,
        "x": 445.1089089726286,
        "y": 195.5910099859337,
        "px": 445.13069818223585,
        "py": 195.61234898511466,
        "fixed": true
      },
      "fixed": true
    },
    {
      "source": {
        "nucleotideLetter": "T",
        "color": "red",
        "index": 3,
        "weight": 2,
        "x": 445.1089089726286,
        "y": 195.5910099859337,
        "px": 445.13069818223585,
        "py": 195.61234898511466,
        "fixed": true
      },
      "target": {
        "nucleotideLetter": "G",
        "color": "black",
        "index": 4,
        "weight": 2,
        "x": 442.5380250194189,
        "y": 212.69569687170076,
        "px": 442.5564943473565,
        "py": 212.69978734534692,
        "fixed": true
      },
      "fixed": true
    },
    {
      "source": {
        "nucleotideLetter": "G",
        "color": "black",
        "index": 4,
        "weight": 2,
        "x": 442.5380250194189,
        "y": 212.69569687170076,
        "px": 442.5564943473565,
        "py": 212.69978734534692,
        "fixed": true
      },
      "target": {
        "nucleotideLetter": "G",
        "color": "black",
        "index": 5,
        "weight": 3,
        "x": 455.22279940316014,
        "y": 226.37642191787742,
        "px": 455.2201702751991,
        "py": 226.37390213355096,
        "fixed": true
      },
      "fixed": true
    },
    {
      "source": {
        "nucleotideLetter": "G",
        "color": "black",
        "index": 5,
        "weight": 3,
        "x": 455.22279940316014,
        "y": 226.37642191787742,
        "px": 455.2201702751991,
        "py": 226.37390213355096,
        "fixed": true
      },
      "target": {
        "nucleotideLetter": "C",
        "color": "blue",
        "index": 6,
        "weight": 2,
        "x": 456.6435154667902,
        "y": 243.89278434142318,
        "px": 456.628135359219,
        "py": 243.87797868333428,
        "fixed": true
      },
      "fixed": true
    },
    {
      "source": {
        "nucleotideLetter": "C",
        "color": "blue",
        "index": 6,
        "weight": 2,
        "x": 456.6435154667902,
        "y": 243.89278434142318,
        "px": 456.628135359219,
        "py": 243.87797868333428,
        "fixed": true
      },
      "target": {
        "nucleotideLetter": "C",
        "color": "blue",
        "index": 7,
        "weight": 2,
        "x": 447.5785117617665,
        "y": 258.2261230691175,
        "px": 447.56989865897935,
        "py": 258.2000202412223,
        "fixed": true
      },
      "fixed": true
    },
    {
      "source": {
        "nucleotideLetter": "C",
        "color": "blue",
        "index": 7,
        "weight": 2,
        "x": 447.5785117617665,
        "y": 258.2261230691175,
        "px": 447.56989865897935,
        "py": 258.2000202412223,
        "fixed": true
      },
      "target": {
        "nucleotideLetter": "A",
        "color": "green",
        "index": 8,
        "weight": 2,
        "x": 430.9916323195914,
        "y": 257.0403298318571,
        "px": 430.99986815233785,
        "py": 257.01790736201826,
        "fixed": true
      },
      "fixed": true
    },
    {
      "source": {
        "nucleotideLetter": "A",
        "color": "green",
        "index": 8,
        "weight": 2,
        "x": 430.9916323195914,
        "y": 257.0403298318571,
        "px": 430.99986815233785,
        "py": 257.01790736201826,
        "fixed": true
      },
      "target": {
        "nucleotideLetter": "A",
        "color": "green",
        "index": 9,
        "weight": 1,
        "x": 418.4113972967732,
        "y": 246.22036851512644,
        "px": 418.4324222522007,
        "py": 246.21229122820273,
        "fixed": true
      },
      "fixed": true
    },
    {
      "source": {
        "nucleotideLetter": "A",
        "color": "green",
        "index": 0,
        "weight": 2,
        "x": 472.54116758313035,
        "y": 222.09807372919263,
        "px": 472.51739109210365,
        "py": 222.0987396596726,
        "fixed": true
      },
      "target": {
        "nucleotideLetter": "G",
        "color": "black",
        "index": 5,
        "weight": 3,
        "x": 455.22279940316014,
        "y": 226.37642191787742,
        "px": 455.2201702751991,
        "py": 226.37390213355096,
        "fixed": true
      },
      "fixed": true
    }
  ]
};
