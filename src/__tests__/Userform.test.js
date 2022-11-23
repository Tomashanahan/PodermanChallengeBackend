const app = require("../../index"); // Link to your app file
const supertest = require("supertest");
const request = supertest(app);

describe("when user searches their information", () => {
	it("should respond with an error when the token is not provided", async (done) => {
		const res = await request
			.post(`/userForm`)
			.set("Accept", "application/json");
		expect(res.body.msg).toBe("Tonken invalido o inexistente");
		done();
	});

	it("should respond with an error when the token is not the correct type", async (done) => {
		const res = await request
			.post(`/userForm`)
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
			);
		expect(res.body.msg).toBe("Tonken invalido");
		done();
	});

	it("should respond with an empty object when the user is new and token correct", async (done) => {
		// creating a new user
		const createUser = await request
			.post(`/register`)
			.send({
				fullName: "tomas shanahan",
				email: "t@hotmail.com",
				password: "admin12345",
			})
			.set("Accept", "application/json");

		// login with the user to resive the token
		const loginTheNewUserToTakeTheToken = await request
			.post(`/login`)
			.send({ email: "t@hotmail.com", password: "admin12345" })
			.set("Accept", "application/json");

		const res = await request
			.post(`/userForm`)
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);
		expect(res.body).toEqual({}); // at first the response should be an empty object
		done();
	});

	it("should respond with an object when the user completed at list one part of the form and token correct", async (done) => {
		let infoToAddInTheDataBase = {
			CasaPrincipal: {
				RackPrincipalLimpieza:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				FuncionamientoAP: "Si",
				FuncionamientoTelefono: "Si",
				UPS: "Si",
			},
			ExAgroinsumos: {
				RackPrincipalLimpieza:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				FuncionamientoAP: "Si",
			},
			Taller: {
				RackPrincipalLimpieza:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png0",
				FuncionamientoTelefono: "Si",
				FuncionamientoAP: "Si",
			},
			Hangar: {
				RackPrincipalLimpieza:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png4",
				FuncionamientoTelefono: "Si",
				FuncionamientoAP: "Si",
			},
			Oficina: {
				FuncionamientoTelefono: "Si",
				LimpiarPC:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				AcomodarCables:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
			},
			Balanza: {
				RackPrincipalLimpieza:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png1",
				FuncionamientoAP: "Si",
				LimpiarPC: "Si",
				UPS: "Si",
				FuncionamientoTelefono: "Si",
			},
			Agroinsumos: {
				FuncionamientoAP: "Si",
			},
			Camaras: {
				ChequearVisualizacion: "Si",
			},
		};

		// creating a new user
		const createUser = await request
			.post(`/register`)
			.send({
				fullName: "tomas shanahan",
				email: "t@hotmail.com",
				password: "admin12345",
			})
			.set("Accept", "application/json");

		// login with the user to resive the token
		const loginTheNewUserToTakeTheToken = await request
			.post(`/login`)
			.send({ email: "t@hotmail.com", password: "admin12345" })
			.set("Accept", "application/json");

		// completing the form to be able to check if the route is working good
		const _casaPrincipal = await request
			.post(`/userForm/form?typeOfCategory=casaPrincipal`)
			.send({ CasaPrincipal: infoToAddInTheDataBase.CasaPrincipal })
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		const _exAgroinsumos = await request
			.post(`/userForm/form?typeOfCategory=exAgroinsumos`)
			.send({
				ExAgroinsumos: infoToAddInTheDataBase.ExAgroinsumos,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		const _taller = await request
			.post(`/userForm/form?typeOfCategory=taller`)
			.send({
				Taller: infoToAddInTheDataBase.Taller,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		const _hangar = await request
			.post(`/userForm/form?typeOfCategory=hangar`)
			.send({
				Hangar: infoToAddInTheDataBase.Hangar,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		const _oficina = await request
			.post(`/userForm/form?typeOfCategory=oficina`)
			.send({
				Oficina: infoToAddInTheDataBase.Oficina,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		const _balanza = await request
			.post(`/userForm/form?typeOfCategory=balanza`)
			.send({
				Balanza: infoToAddInTheDataBase.Balanza,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		const _agroinsumos = await request
			.post(`/userForm/form?typeOfCategory=agroinsumos`)
			.send({
				Agroinsumos: infoToAddInTheDataBase.Agroinsumos,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		const _camaras = await request
			.post(`/userForm/form?typeOfCategory=camaras`)
			.send({
				Camaras: infoToAddInTheDataBase.Camaras,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		const res = await request
			.get(`/userForm`)
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);
		expect(res.body.casaPrincipal).toMatchObject(
			infoToAddInTheDataBase.CasaPrincipal
		);
		expect(res.body.exAgroinsumos).toMatchObject(
			infoToAddInTheDataBase.ExAgroinsumos
		);
		expect(res.body.taller).toMatchObject(infoToAddInTheDataBase.Taller);
		expect(res.body.hangar).toMatchObject(infoToAddInTheDataBase.Hangar);
		expect(res.body.oficina).toMatchObject(infoToAddInTheDataBase.Oficina);
		expect(res.body.balanza).toMatchObject(infoToAddInTheDataBase.Balanza);
		expect(res.body.agroinsumos).toMatchObject(
			infoToAddInTheDataBase.Agroinsumos
		);
		expect(res.body.camaras).toMatchObject(infoToAddInTheDataBase.Camaras);
		done();
	});
});

describe("when user complete the form", () => {
	it("should respond when the user completes the form", async (done) => {
		let infoToAddInTheDataBase = {
			CasaPrincipal: {
				RackPrincipalLimpieza:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				FuncionamientoAP: "Si",
				FuncionamientoTelefono: "Si",
				UPS: "Si",
			},
			ExAgroinsumos: {
				RackPrincipalLimpieza:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				FuncionamientoAP: "Si",
			},
			Taller: {
				RackPrincipalLimpieza:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png0",
				FuncionamientoTelefono: "Si",
				FuncionamientoAP: "Si",
			},
			Hangar: {
				RackPrincipalLimpieza:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png4",
				FuncionamientoTelefono: "Si",
				FuncionamientoAP: "Si",
			},
			Oficina: {
				FuncionamientoTelefono: "Si",
				LimpiarPC:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				AcomodarCables:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
			},
			Balanza: {
				RackPrincipalLimpieza:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png1",
				FuncionamientoAP: "Si",
				LimpiarPC: "Si",
				UPS: "Si",
				FuncionamientoTelefono: "Si",
			},
			Agroinsumos: {
				FuncionamientoAP: "Si",
			},
			Camaras: {
				ChequearVisualizacion: "Si",
			},
		};

		// creating a new user
		const createUser = await request
			.post(`/register`)
			.send({
				fullName: "tomas shanahan",
				email: "t@hotmail.com",
				password: "admin12345",
			})
			.set("Accept", "application/json");

		// login with the user to resive the token
		const loginTheNewUserToTakeTheToken = await request
			.post(`/login`)
			.send({ email: "t@hotmail.com", password: "admin12345" })
			.set("Accept", "application/json");

		// completing the form to be able to check if the route is working good
		const _casaPrincipal = await request
			.post(`/userForm/form?typeOfCategory=casaPrincipal`)
			.send({ CasaPrincipal: infoToAddInTheDataBase.CasaPrincipal })
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		const _exAgroinsumos = await request
			.post(`/userForm/form?typeOfCategory=exAgroinsumos`)
			.send({
				ExAgroinsumos: infoToAddInTheDataBase.ExAgroinsumos,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		const _taller = await request
			.post(`/userForm/form?typeOfCategory=taller`)
			.send({
				Taller: infoToAddInTheDataBase.Taller,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		const _hangar = await request
			.post(`/userForm/form?typeOfCategory=hangar`)
			.send({
				Hangar: infoToAddInTheDataBase.Hangar,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		const _oficina = await request
			.post(`/userForm/form?typeOfCategory=oficina`)
			.send({
				Oficina: infoToAddInTheDataBase.Oficina,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		const _balanza = await request
			.post(`/userForm/form?typeOfCategory=balanza`)
			.send({
				Balanza: infoToAddInTheDataBase.Balanza,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		const _agroinsumos = await request
			.post(`/userForm/form?typeOfCategory=agroinsumos`)
			.send({
				Agroinsumos: infoToAddInTheDataBase.Agroinsumos,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		const _camaras = await request
			.post(`/userForm/form?typeOfCategory=camaras`)
			.send({
				Camaras: infoToAddInTheDataBase.Camaras,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);
		expect(_casaPrincipal.body.CasaPrincipal).toMatchObject(
			infoToAddInTheDataBase.CasaPrincipal
		);
		expect(_exAgroinsumos.body.ExAgroinsumos).toMatchObject(
			infoToAddInTheDataBase.ExAgroinsumos
		);
		expect(_taller.body.Taller).toMatchObject(infoToAddInTheDataBase.Taller);
		expect(_hangar.body.Hangar).toMatchObject(infoToAddInTheDataBase.Hangar);
		expect(_oficina.body.Oficina).toMatchObject(infoToAddInTheDataBase.Oficina);
		expect(_balanza.body.Balanza).toMatchObject(infoToAddInTheDataBase.Balanza);
		expect(_agroinsumos.body.Agroinsumos).toMatchObject(
			infoToAddInTheDataBase.Agroinsumos
		);
		expect(_camaras.body.Camaras).toMatchObject(infoToAddInTheDataBase.Camaras);
		done();
	});
});

describe("when user modify the form information", () => {
	it("should respond when the user modify the Casa Principal form", async (done) => {
		let infoInTheDataBase = {
			CasaPrincipal: {
				RackPrincipalLimpieza:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				FuncionamientoAP: "Si",
				FuncionamientoTelefono: "Si",
				UPS: "Si",
			},
		};
		let infoToModifyInTheDataBase = {
			CasaPrincipal: {
				RackPrincipalLimpieza: "new image",
				FuncionamientoAP: "No",
				FuncionamientoTelefono: "No",
				UPS: "No",
			},
		};
		let infoExpectedToBeInTheDBAfterModify = {
			casaPrincipal: {
				RackPrincipalLimpieza: "new image",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				FuncionamientoAP: "No",
				FuncionamientoTelefono: "No",
				UPS: "No",
			},
		};
		// creating a new user
		const createUser = await request
			.post(`/register`)
			.send({
				fullName: "tomas shanahan",
				email: "t@hotmail.com",
				password: "admin12345",
			})
			.set("Accept", "application/json");

		// login with the user to resive the token
		const loginTheNewUserToTakeTheToken = await request
			.post(`/login`)
			.send({ email: "t@hotmail.com", password: "admin12345" })
			.set("Accept", "application/json");

		// updating the values in the form to be able to check if the route is working good
		const _casaPrincipal = await request
			.put(`/userForm/casaprincipal`)
			.send({ CasaPrincipal: infoToModifyInTheDataBase.CasaPrincipal })
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);
		expect(_casaPrincipal.body).toMatchObject(
			infoExpectedToBeInTheDBAfterModify
		);
		done();
	});
	it("should respond when the user modify the ExAgroinsumos form", async (done) => {
		// creating a new user
		const createUser = await request
			.post(`/register`)
			.send({
				fullName: "tomas shanahan",
				email: "t@hotmail.com",
				password: "admin12345",
			})
			.set("Accept", "application/json");

		// login with the user to resive the token
		const loginTheNewUserToTakeTheToken = await request
			.post(`/login`)
			.send({ email: "t@hotmail.com", password: "admin12345" })
			.set("Accept", "application/json");
		infoInTheDB = {
			ExAgroinsumos: {
				RackPrincipalLimpieza:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				FuncionamientoAP: "Si",
			},
		};
		let infoToModifyInTheDataBase = {
			ExAgroinsumos: {
				RackPrincipalLimpieza: "new image",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				FuncionamientoAP: "No",
			},
		};
		infoExpectedToBeInTheDBAfterModify = {
			exAgroinsumos: {
				RackPrincipalLimpieza: "new image",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				FuncionamientoAP: "No",
			},
		};

		const _exAgroinsumos = await request
			.put(`/userForm/exAgroinsumos`)
			.send({
				ExAgroinsumos: infoToModifyInTheDataBase.ExAgroinsumos,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);

		expect(_exAgroinsumos.body).toMatchObject(
			infoExpectedToBeInTheDBAfterModify
		);
		done();
	});
	it("should respond when the user modify the Taller form", async (done) => {
		// creating a new user
		const createUser = await request
			.post(`/register`)
			.send({
				fullName: "tomas shanahan",
				email: "t@hotmail.com",
				password: "admin12345",
			})
			.set("Accept", "application/json");

		// login with the user to resive the token
		const loginTheNewUserToTakeTheToken = await request
			.post(`/login`)
			.send({ email: "t@hotmail.com", password: "admin12345" })
			.set("Accept", "application/json");
		infoInTheDB = {
			Taller: {
				RackPrincipalLimpieza:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png0",
				FuncionamientoTelefono: "Si",
				FuncionamientoAP: "Si",
			},
		};
		infoExpectedToBeInTheDBAfterModify = {
			taller: {
				RackPrincipalLimpieza: "new image",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png0",
				FuncionamientoTelefono: "No",
				FuncionamientoAP: "No",
			},
		};
		let infoToModifyInTheDataBase = {
			Taller: {
				RackPrincipalLimpieza: "new image",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png0",
				FuncionamientoTelefono: "No",
				FuncionamientoAP: "No",
			},
		};
		const _taller = await request
			.put(`/userForm/taller`)
			.send({
				Taller: infoToModifyInTheDataBase.Taller,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);
		expect(_taller.body).toMatchObject(infoExpectedToBeInTheDBAfterModify);
		done();
	});
	it("should respond when the user modify the Hangar form", async (done) => {
		// creating a new user
		const createUser = await request
			.post(`/register`)
			.send({
				fullName: "tomas shanahan",
				email: "t@hotmail.com",
				password: "admin12345",
			})
			.set("Accept", "application/json");

		// login with the user to resive the token
		const loginTheNewUserToTakeTheToken = await request
			.post(`/login`)
			.send({ email: "t@hotmail.com", password: "admin12345" })
			.set("Accept", "application/json");
		infoInTheDB = {
			Hangar: {
				RackPrincipalLimpieza:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png4",
				FuncionamientoTelefono: "Si",
				FuncionamientoAP: "Si",
			},
		};
		infoExpectedToBeInTheDBAfterModify = {
			hangar: {
				RackPrincipalLimpieza: "new image",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png4",
				FuncionamientoTelefono: "Si",
				FuncionamientoAP: "Si",
			},
		};
		let infoToModifyInTheDataBase = {
			Hangar: {
				RackPrincipalLimpieza: "new image",
				FuncionamientoTelefono: "Si",
				FuncionamientoAP: "Si",
			},
		};
		const _hangar = await request
			.put(`/userForm/hangar`)
			.send({
				Hangar: infoToModifyInTheDataBase.Hangar,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);
		expect(_hangar.body).toMatchObject(infoExpectedToBeInTheDBAfterModify);
		done();
	});
	it("should respond when the user modify the Oficina form", async (done) => {
		// creating a new user
		const createUser = await request
			.post(`/register`)
			.send({
				fullName: "tomas shanahan",
				email: "t@hotmail.com",
				password: "admin12345",
			})
			.set("Accept", "application/json");

		// login with the user to resive the token
		const loginTheNewUserToTakeTheToken = await request
			.post(`/login`)
			.send({ email: "t@hotmail.com", password: "admin12345" })
			.set("Accept", "application/json");
		infoInTheDB = {
			Oficina: {
				FuncionamientoTelefono: "Si",
				LimpiarPC:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				AcomodarCables:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
			},
		};
		infoExpectedToBeInTheDBAfterModify = {
			oficina: {
				FuncionamientoTelefono: "No",
				LimpiarPC:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				AcomodarCables: "new image",
			},
		};
		let infoToModifyInTheDataBase = {
			Oficina: {
				FuncionamientoTelefono: "No",
				AcomodarCables: "new image",
			},
		};
		const _oficina = await request
			.put(`/userForm/oficina`)
			.send({
				Oficina: infoToModifyInTheDataBase.Oficina,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);
		expect(_oficina.body).toMatchObject(infoExpectedToBeInTheDBAfterModify);
		done();
	});
	it("should respond when the user modify the Balanza form", async (done) => {
		// creating a new user
		const createUser = await request
			.post(`/register`)
			.send({
				fullName: "tomas shanahan",
				email: "t@hotmail.com",
				password: "admin12345",
			})
			.set("Accept", "application/json");

		// login with the user to resive the token
		const loginTheNewUserToTakeTheToken = await request
			.post(`/login`)
			.send({ email: "t@hotmail.com", password: "admin12345" })
			.set("Accept", "application/json");
		infoInTheDB = {
			Balanza: {
				RackPrincipalLimpieza:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png1",
				FuncionamientoAP: "Si",
				LimpiarPC: "Si",
				UPS: "Si",
				FuncionamientoTelefono: "Si",
			},
		};
		infoExpectedToBeInTheDBAfterModify = {
			balanza: {
				RackPrincipalLimpieza: "new image",
				RackPrincipalOrden:
					"https://app.rallybright.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png1",
				FuncionamientoAP: "No",
				LimpiarPC: "No",
				UPS: "No",
				FuncionamientoTelefono: "Si",
			},
		};
		let infoToModifyInTheDataBase = {
			Balanza: {
				RackPrincipalLimpieza: "new image",
				FuncionamientoAP: "No",
				LimpiarPC: "No",
				UPS: "No",
			},
		};
		const _balanza = await request
			.put(`/userForm/balanza`)
			.send({
				Balanza: infoToModifyInTheDataBase.Balanza,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);
		expect(_balanza.body).toMatchObject(infoExpectedToBeInTheDBAfterModify);
		done();
	});
	it("should respond when the user modify the Agroinsumos form", async (done) => {
		// creating a new user
		const createUser = await request
			.post(`/register`)
			.send({
				fullName: "tomas shanahan",
				email: "t@hotmail.com",
				password: "admin12345",
			})
			.set("Accept", "application/json");

		// login with the user to resive the token
		const loginTheNewUserToTakeTheToken = await request
			.post(`/login`)
			.send({ email: "t@hotmail.com", password: "admin12345" })
			.set("Accept", "application/json");
		infoInTheDB = {
			Agroinsumos: {
				FuncionamientoAP: "Si",
			},
		};
		infoExpectedToBeInTheDBAfterModify = {
			agroinsumos: {
				FuncionamientoAP: "No",
			},
		};
		let infoToModifyInTheDataBase = {
			Agroinsumos: {
				FuncionamientoAP: "No",
			},
		};
		const _agroinsumos = await request
			.put(`/userForm/agroinsumos`)
			.send({
				Agroinsumos: infoToModifyInTheDataBase.Agroinsumos,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);
		expect(_agroinsumos.body).toMatchObject(infoExpectedToBeInTheDBAfterModify);
		done();
	});
	it("should respond when the user modify the Camaras form", async (done) => {
		// creating a new user
		const createUser = await request
			.post(`/register`)
			.send({
				fullName: "tomas shanahan",
				email: "t@hotmail.com",
				password: "admin12345",
			})
			.set("Accept", "application/json");

		// login with the user to resive the token
		const loginTheNewUserToTakeTheToken = await request
			.post(`/login`)
			.send({ email: "t@hotmail.com", password: "admin12345" })
			.set("Accept", "application/json");
		infoInTheDB = {
			Camaras: {
				ChequearVisualizacion: "Si",
			},
		};
		infoExpectedToBeInTheDBAfterModify = {
			camaras: {
				ChequearVisualizacion: "No",
			},
		};
		let infoToModifyInTheDataBase = {
			Camaras: {
				ChequearVisualizacion: "No",
			},
		};
		const _camaras = await request
			.put(`/userForm/camaras`)
			.send({
				Camaras: infoToModifyInTheDataBase.Camaras,
			})
			.set("Accept", "application/json")
			.set(
				"Authorization",
				`Bearer ${loginTheNewUserToTakeTheToken.body.token}`
			);
		expect(_camaras.body).toMatchObject(infoExpectedToBeInTheDBAfterModify);
		done();
	});
});
