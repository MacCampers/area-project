import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-json',
  templateUrl: './about-json.component.html',
  styleUrls: ['./about-json.component.css'],
})
export class AboutJsonComponent implements OnInit {
  sample: any;

  constructor() { }

  ngOnInit() {
    this.sample = [{
        "client": {
            "host": "0.0.0.0"
        },
        "server": {
            "current_time": 1541969865,
            "services": [
                {
                    "name": "weather",
                    "widgets": [
                        {
                            "name": "weather",
                            " description ": "Affichage de la temperature pour une ville",
                            " params ": [
                                {
                                    "name": "city",
                                    "type ": "string"
                                },
                                {
                                    "name": "position",
                                    "type": "integer"
                                },
                                {
                                    "name": "isActive",
                                    "type": "integer"
                                }
                            ]
                        }
                    ]
                },
                {
                    " name ": "Google",
                    " widgets ": [
                        {
                            " name ": "map",
                            " description ": "Affiche l'api google map",
                            " params ": [
                                {
                                    " name ": "position",
                                    " type ": "integer"
                                },
                                {
                                    " name ": "isActive",
                                    " type ": "integer"
                                }
                            ]
                            
                        },
                        {
                            " name ": "Youtube",
                            " description ": "Youtube search api qui permet de chercher et regarder une video avec Youtube Iframe",
                            " params ": [
                                {
                                    " name ": "position",
                                    " type ": "integer"
                                },
                                {
                                    " name ": "isActive",
                                    " type ": "integer"
                                }
                            ]
                        }
                    ]
                },
                {
                    " name ": "Calendar",
                    " widgets ": [
                        {
                            " name ": "calendar",
                            " description ": "Calendrier interactif avec création d'event",
                            " params ": [
                                {
                                    " name ": "position",
                                    " type ": "integer"
                                },
                                {
                                    " name ": "isActive",
                                    " type ": "integer"
                                }
                            ]
                        }
                    ]
                },
                {
                    " name ": "News",
                    " widgets ": [
                        {
                            " name ": "news",
                            " description ": "Fil d'actualité avec choix de la provenance des news (BBC news, ABC news, Newsweek, ...)",
                            " params ": [
                                {
                                    " name ": "position",
                                    " type ": "integer"
                                },
                                {
                                    " name ": "isActive",
                                    " type ": "integer"
                                }
                            ]
                        }
                    ]
                },
                {
                    " name ": "MovieDB",
                    " widgets ": [
                        {
                            " name ": "movie",
                            " description ": "recherche des films parmi la base de données de film MovieDB",
                            " params ": [
                                {
                                    " name ": "position",
                                    " type ": "integer"
                                },
                                {
                                    " name ": "isActive",
                                    " type ": "integer"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }]
  }
}