import {Injectable} from '@angular/core';
import {Art} from '../../shared/art.model';

@Injectable({providedIn: 'root'})
export class GalleryService {
  private arts: Art[] = [
    new Art(
      'id-0',
      'La barca durante l\'inondazione a Port-Marly',
      'L\'acqua della Senna uscita dagli argini ha invaso il paese, le strade e le piazze. A destra emergono dal grande specchio liquido una serie regolari di alberi coltivati. A sinistra invece l\'acqua ha circondato l\'abitazione di un mercante di vini. Il cielo è tornato sereno ed è attraversato da veloci nubi bianche che si riflettono sull\'acqua. Una piccola imbarcazione staziona all\'ingresso della casa e su di essa due persone attendono che la Senna torni nei suoi argini.',
      'https://firebasestorage.googleapis.com/v0/b/reddragon-vrmuseum.appspot.com/o/Alfred_Sisley_133.jpg?alt=media&token=4c1d7087-4c58-4793-9bb4-576c13174ac2',
      {width: 0.61, height: 0.505},
      'Alfred Sisley'
    ),
    new Art(
      'id-1',
      'Saturno che divora i suoi figli',
      'L\'acqua della Senna uscita dagli argini ha invaso il paese, le strade e le piazze. A destra emergono dal grande specchio liquido una serie regolari di alberi coltivati. A sinistra invece l\'acqua ha circondato l\'abitazione di un mercante di vini. Il cielo è tornato sereno ed è attraversato da veloci nubi bianche che si riflettono sull\'acqua. Una piccola imbarcazione staziona all\'ingresso della casa e su di essa due persone attendono che la Senna torni nei suoi argini.',
      'https://firebasestorage.googleapis.com/v0/b/reddragon-vrmuseum.appspot.com/o/Francisco_Goya_85.jpg?alt=media&token=eda5f54a-05dd-4a54-b30f-c453fa03ea97',
      {width: 0.81, height: 1.43},
      'Francisco Goya'
    ),
    new Art(
      'id-2',
      'Ultima Cena',
      'La scena dell’Ultima Cena rappresentata nel Cenacolo vinciano è ambientata all’interno di uno spazio architettonico chiuso. Il soffitto è decorato con un cassettone a lacunari. Sulle pareti invece sono appesi alcuni arazzi ora non più visibili. Sulla parete di fondo vi sono poi tre finestre. Sul tavolo sono presenti pietanze e stoviglie curate nei minimi dettagli. La grande tavola dietro la quale sono seduti gli apostoli e Cristo occupa tutta la porzione orizzontale. Gesù si trova al centro da solo. Le sue braccia sono posate sul tavolo e il viso è reclinato. Gli occhi sono semiaperti e le labbra appena scostate. Gli apostoli sono disposti a gruppi di tre alla sua destra e alla sua sinistra. L’apostolo Pietro è il quarto da sinistra. L’uomo si sporge in avanti impugnando un coltello con la destra. Giuda ha con se una borsa con del denaro e nella sorpresa rovescia una saliera. A destra si trovano Matteo, Giuda Taddeo e Simone. Il quinto da destra è Giacomo Maggiore mentre Filippo stringe le mani al petto dichiarandosi innocente.',
      'https://firebasestorage.googleapis.com/v0/b/reddragon-vrmuseum.appspot.com/o/Leonardo_Ultima_Cena.jpg?alt=media&token=425f6db3-9f3f-4d79-aa10-4545e54ed72d',
      {width: 0.880, height: 0.460},
      'Francisco Goya'
    ),
  ];

  constructor(private http: GalleryService) { }

  getArts(): Art[] {
    return this.arts.slice();
  }

}
