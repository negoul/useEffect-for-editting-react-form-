import React from "react";
import PropTypes from "prop-types";
import Button, {SPINNER, TYPE} from '@sakit-sa/react-button';

import style from "./Login.module.scss";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoading: false
    };
  }

  changeState(key, value, callback = null) {
    this.setState({ [key]: value }, () => {
      if (callback) {
        callback.bind(this).call();
      }
    });
  }

  async login(e) {
    e.preventDefault();
    const { login, onLogin } = this.props;
    const { username, password } = this.state;
    this.changeState("isLoading", true);

    try {
      const response = await login({ username, password });
      onLogin(response);
    } catch (e) {
      console.log("login response", e);
    } finally {
      this.changeState("isLoading", false);
    }
  }

  render() {
    const { username, password, isLoading } = this.state;

    return (
      <div className={`uk-section-small uk-section-muted ${style.login}`}>
        <div className="uk-margin-small uk-logo uk-flex uk-flex-center">
          <figure className={`${style.logo} uk-margin-medium-bottom`}>
            <img src={this.props.logo} alt="company logo" className={style.logo} />
          </figure>
        </div>
        <div className={"uk-flex uk-flex-middle"}>
          <div className={"uk-container uk-container-large"}>
            <div className={`uk-flex uk-flex-center ${style.login__container}`}>
              <div className={`flip uk-width-large@s uk-child-width-1-1`}>
                <div
                  className={
                    "flip__front uk-card uk-card-default uk-border-rounded"
                  }
                >
                  <div className="uk-card-body uk-height-1-1">
                    <form
                      onSubmit={(e) => {
                        e.persist();
                        this.login(e);
                      }}
                      className="uk-height-1-1 uk-flex uk-flex-between uk-flex-column"
                    >
                      <fieldset className="uk-fieldset">
                        <legend className="heading__bullet text__medium">
                          نام کاربری و کلمه عبور را وارد نمایید.
                        </legend>
                        <div className="uk-margin-medium">
                          <div className="uk-margin-small">
                            <label className="uk-form-label">نام کاربری</label>
                            <div className="uk-form-controls uk-margin-small-top uk-position-relative">
                              <span
                                className="uk-form-icon uk-icon"
                                uk-icon="icon: user"
                              />
                              <input
                                value={username}
                                placeholder="نام کاربری"
                                onChange={({ target }) =>
                                  this.changeState("username", target.value)
                                }
                                className={`${style.login__input} uk-input direction__ltr uk-border-rounded`}
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="uk-margin-small">
                            <label className="uk-form-label">کلمه عبور</label>
                            <div className="uk-form-controls uk-margin-small-top uk-position-relative">
                              <span
                                className="uk-form-icon uk-icon"
                                uk-icon="icon: lock"
                              />
                              <input
                                value={password}
                                placeholder="کلمه عبور"
                                onChange={({ target }) =>
                                  this.changeState("password", target.value)
                                }
                                className={`${style.login__input} uk-input direction__ltr uk-border-rounded`}
                                type="password"
                              />
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <div className="uk-margin-small uk-flex uk-flex-left">
                        <Button
                          className="padding-horizontal-28 min-width-100"
                          type={TYPE.SUBMIT}
                          spinnerName={SPINNER.TAIL_SPIN}
                          isLoading={isLoading}
                        >
                          ورود
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  logo: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
};
