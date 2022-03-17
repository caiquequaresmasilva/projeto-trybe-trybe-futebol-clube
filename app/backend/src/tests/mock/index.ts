const mockedLogin = {
    "id": 1,
    "username": "Admin",
    "role": "admin",
    "email": "admin@admin.com",
    "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW" 
}

const mockedClubs = [
  {
    "id": 1,
    "clubName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "clubName": "Bahia"
  },
  {
    "id": 3,
    "clubName": "Botafogo"
  },
  {
    "id": 4,
    "clubName": "Corinthians"
  },
  {
    "id": 5,
    "clubName": "Cruzeiro"
  },
  {
    "id": 6,
    "clubName": "Ferroviária"
  },
  {
    "id": 7,
    "clubName": "Flamengo"
  },
  {
    "id": 8,
    "clubName": "Grêmio"
  },
  {
    "id": 9,
    "clubName": "Internacional"
  },
  {
    "id": 10,
    "clubName": "Minas Brasília"
  },
  {
    "id": 11,
    "clubName": "Napoli-SC"
  },
  {
    "id": 12,
    "clubName": "Palmeiras"
  },
  {
    "id": 13,
    "clubName": "Real Brasília"
  },
  {
    "id": 14,
    "clubName": "Santos"
  },
  {
    "id": 15,
    "clubName": "São José-SP"
  },
  {
    "id": 16,
    "clubName": "São Paulo"
  }
]

const mockedClubId = {
    "id": 5,
    "clubName": "Cruzeiro"
}

const validUser = { 
    email: "admin@admin.com", 
    password: "secret_admin"
  };

const invalidUser = {
    email: 'nãoexiste@gmail.com',
    password: 'senhaerrada'
}

const mockedMatches = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeClub": {
      "clubName": "São Paulo"
    },
      "awayClub": {
        "clubName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeClub": {
      "clubName": "São Paulo"
    },
    "awayClub": {
      "clubName": "Internacional"
    }
  }
];

const matchToSave = {
    "homeTeam": 16, 
    "awayTeam": 8, 
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true 
};

export { 
    mockedLogin, 
    validUser, 
    invalidUser, 
    mockedClubs,
    mockedClubId,
    mockedMatches,
    matchToSave };