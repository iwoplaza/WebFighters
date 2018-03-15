class LoginPrompt {
	constructor(callback) {
		this.callback = callback;
		
		this.element = document.createElement('div');
		document.body.appendChild(this.element);
		this.element.classList.add('loginPrompt');
		
		this.elementHeader = document.createElement('h1');
		this.element.appendChild(this.elementHeader);
		this.elementHeader.innerHTML = "Dołącz do gry";
		
		this.elementNameInput = document.createElement('input');
		this.elementNameInput.setAttribute('placeholder', 'Nick');
		this.elementNameInput.onkeypress = (e) => {
			if(e.keyCode == 13) {
				this.callback(this);
			}
		}
		this.element.appendChild(this.elementNameInput);
		
		this.elementJoinButton = document.createElement('button');
		this.elementJoinButton.onclick = () => {
			this.callback(this);
		};
		this.elementJoinButton.innerHTML = "Dołącz";
		this.element.appendChild(this.elementJoinButton);
	}
	
	close() {
		document.body.removeChild(this.element);
	}
}