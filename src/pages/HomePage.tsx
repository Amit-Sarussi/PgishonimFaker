import { useState } from "react";
import NameInput from "./NameInput";
import Permit from "./Permit";

function HomePage() {
	const [name, setName] = useState("");
	const [onNameEdit, setOnNameEdit] = useState<boolean>(true);

	return onNameEdit ? (
		<NameInput
			time={1}
			name={name}
			setName={setName}
			setOnNameEdit={setOnNameEdit}
		/>
	) : (
		<Permit name={name} />
	);
}

export default HomePage;
