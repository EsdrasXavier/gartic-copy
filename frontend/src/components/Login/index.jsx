import React from 'react';
import { PageArea } from './styled';

const Page = () => {
    return (
        <PageArea>
            <form>
                <label className="area">
                    <div className="area--title">E-mail</div>
                    <div className="area--input">
                        <input type="email" />
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">Senha</div>
                    <div className="area--input">
                        <input type="password" />
                    </div>
                </label>
                <label className="area">
                    <div className="area--title"> Lembrar senha</div>
                    <div className="area--input">
                        <input type="checkbox" />
                    </div>
                </label>
                <label className="area">
                    <div className="area--title"></div>
                    <div className="area--input">
                        <button>Fazer login</button>
                    </div>
                </label>
            </form>
        </PageArea>
    );
}

export default Page;