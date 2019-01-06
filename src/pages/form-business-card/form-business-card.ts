import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, NavParams, AlertController } from "ionic-angular";

@Component({
	selector: "page-form-business-card",
	templateUrl: "form-business-card.html"
})
export class FormBusinessCardPage {
	//Declaração da propriedade agrupadora dos models do formulário
	signUpForm: FormGroup;

	constructor(
		public formBuilder: FormBuilder,
		public navCtrl: NavController,
		public navParams: NavParams,
		private alertCtrl: AlertController
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
			EnderecoCep: ["", Validators.compose([Validators.required, Validators.pattern(cepRegex)])],
			EnderecoCidade: ["", [Validators.required]],
			EnderecoUf: ["", [Validators.required, Validators.maxLength(2)]],
			TelefoneComercial: ["", Validators.compose([Validators.required, Validators.pattern(phoneRegex)])],
			TelefoneCelular: ["", Validators.pattern(phoneRegex)],
			Email: [
				"",
				Validators.compose([Validators.required, Validators.email])
			]
		});
	}

	//Função executada no envio do formulário
	onSubmit(): void {
		console.log("Form Enviado");

		//Variável com configuração do alert exibido
		let alert = this.alertCtrl.create({
			title: 'Cartão gerado com sucesso!',
			subTitle: 'O cartão será enviado para o seu e-mail.',
			buttons: ['Ok!'],
			enableBackdropDismiss: true
		  });
		  //Apresentação do alert
		  alert.present();

	}
}
