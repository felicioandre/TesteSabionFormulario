import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Storage } from "@ionic/storage";

import {
	NavController,
	NavParams,
	AlertController,
	ActionSheetController
} from "ionic-angular";

@Component({
	selector: "page-form-business-card",
	templateUrl: "form-business-card.html"
})
export class FormBusinessCardPage {
	//Declaração da propriedade agrupadora dos models do formulário
	signUpForm: FormGroup;
	imageProfile: string = null;
	constructor(
		private alertCtrl: AlertController,
		private camera: Camera,
		private storage: Storage,
		public actionSheetCtrl: ActionSheetController,
		public formBuilder: FormBuilder,
		public navCtrl: NavController,
		public navParams: NavParams,
	) {
		//Variáveis de padrao regex para validações de telefone e cep
		let phoneRegex = /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{4,5}[-\s\.]?[0-9]{4}$/im;
		let cepRegex = /^[0-9]{5}[-]{1}[0-9]{3}$/im;

		//Grupo de models capturados no formulário, com as validações especificadas no escopo
		this.signUpForm = this.formBuilder.group({
			Nome: ["", [Validators.required]],
			Sobrenome: ["", [Validators.required]],
			FotoPerfil: [true],
			Endereco: ["", [Validators.required]],
			EnderecoNumero: ["", [Validators.required]],
			EnderecoComplemento: [""],
			EnderecoCep: [
				"",
				Validators.compose([
					Validators.required,
					Validators.pattern(cepRegex)
				])
			],
			EnderecoCidade: ["", [Validators.required]],
			EnderecoUf: ["", [Validators.required, Validators.maxLength(2)]],
			TelefoneComercial: [
				"",
				Validators.compose([
					Validators.required,
					Validators.pattern(phoneRegex)
				])
			],
			TelefoneCelular: ["", Validators.pattern(phoneRegex)],
			Email: [
				"",
				Validators.compose([Validators.required, Validators.email])
			]
		});

		//verifica se existe alguma imagem armazenada e, se positivo, insere a imagem na variavel
		this.storage.get("imageProfile").then(val => {
			if (val != null) {
				this.imageProfile = val;
			}
		});
	}

	//Função executada no envio do formulário
	onSubmit(): void {
		console.log("Form Enviado");

		//Variável com configuração do alert exibido
		let alert = this.alertCtrl.create({
			title: "Cartão gerado com sucesso!",
			subTitle: "O cartão será enviado para o seu e-mail.",
			buttons: ["Ok!"],
			enableBackdropDismiss: true
		});
		//Apresentação do alert
		alert.present();
	}

	//Função para exibir opções de upload de foto de perfil via action sheet
	onUploadPhoto(): void {
		console.log("start actionsheet");

		//variável que verifica se existe uma imagem carregada
		let showExcluir: boolean = this.imageProfile !== null;

		//variável com configuração inicial do action sheet
		let actionSheet = this.actionSheetCtrl.create({
			title: "Foto de perfil",
			buttons: [
				{
					text: "TIRAR FOTO",
					icon: "camera",
					handler: () => {
						console.log("TIRAR FOTO clicked");

						//this.lastImage = "https://abrilexame.files.wordpress.com/2018/10/8dicas1.jpg?quality=70&strip=info&w=1000&h=1000";

						//this.storage.set("imageProfile", this.lastImage);

						this.takePicture(this.camera.PictureSourceType.CAMERA);
					}
				},
				{
					text: "GALERIA",
					icon: "image",
					handler: () => {
						console.log("GALERIA clicked");

						this.takePicture(
							this.camera.PictureSourceType.PHOTOLIBRARY
						);
					}
				}
			]
		});

		//adiciona o botão excluir foto se tiver uma foto carregada
		if (showExcluir) {
			actionSheet.addButton({
				text: "EXCLUIR FOTO",
				icon: "trash",
				role: "destructive",
				handler: () => {
					//altera a variavel da imagem para ficar vazia novamente
					this.imageProfile = null;

					//remove do storage o valor da imagem armazenada
					this.storage.remove("imageProfile");

					console.log("EXCLUIR clicked");
				}
			});
		}

		//adiciona o botão cancelar depois de tudo, pra ficar na ordem correta
		actionSheet.addButton({
			text: "CANCELAR",
			icon: "close",
			role: "cancel"
		});

		actionSheet.present();
	}

	takePicture(sourceType): any {
		console.log("takePicture", sourceType);

		//Opcoes da camera/galeria
		const options: CameraOptions = {
			quality: 30,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: sourceType,
			saveToPhotoAlbum: false,
			correctOrientation: true
		};

		//Base 64 gerado do plugin da camera
		this.camera.getPicture(options).then(
			imagePath => {

				//Definição de valor da variavel da imagem
				this.imageProfile = 'data:image/jpeg;base64,' + imagePath;
				console.log('imagePath', imagePath);
				console.log('base64Image', this.imageProfile);

				//Salvar no storage do device
				this.storage.set("imageProfile", this.imageProfile);
			},
			err => {
				console.log("error", err);
			}
		);
	}
}
