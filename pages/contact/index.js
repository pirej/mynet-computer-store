import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import MenuList from '../../components/menuList/MenuList';
import TopBar from '../../components/productSection/TopBar';

const ContactStyle = styled.div`
  /* background-color: lightblue; */
  display: flex;
  padding: 0 10%;
  gap: 5%;
  .mainContactSection {
    width: 100%;
    .contactSection {
      padding: 0;
      padding: 0 10%;
      /* display: flex;
      flex-direction: column;
      justify-content: space-around; */

      .sectionTitle {
        text-align: center;
        h3 {
          /* font-weight: 700; */
          font-size: 1.25rem;
          letter-spacing: 0.05rem;
        }
      }
    }

    .formAndInfo {
      display: flex;
      padding: 0 4%;
      .formWrap {
        padding: 0 0.5rem;
        .theForm {
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .sentSpan {
            color: #19a695;
            margin-left: 0.5rem;
          }
          label {
            display: block;
            margin-bottom: 0.2em;
            margin-left: 0.5rem;
          }

          p {
            width: 100%;
            margin-bottom: 0;
            :first-of-type {
              margin-top: 0;
            }
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            textarea:-webkit-autofill,
            textarea:-webkit-autofill:hover,
            textarea:-webkit-autofill:focus,
            select:-webkit-autofill,
            select:-webkit-autofill:hover,
            select:-webkit-autofill:focus {
              -webkit-text-fill-color: #3f6795;
              transition: background-color 5000s ease-in-out 0s;
            }

            input,
            textarea {
              color: #3f6795;
              background-color: #e9edf2;
              width: 100%;
              border-radius: 4px;
              border: solid 1px #c3ced9;
              letter-spacing: 0.04rem;

              :focus {
                outline: none !important;
                border: 1px solid #7c90a6;
                box-shadow: 0px 4px 7px -2px rgba(113, 158, 206, 0.49);
                -webkit-box-shadow: 0px 4px 7px -2px rgba(113, 158, 206, 0.49);
                -moz-box-shadow: 0px 4px 7px -2px rgba(113, 158, 206, 0.49);
              }
            }

            input {
              height: 2rem;
            }
          }

          .btn {
            margin: 0.75rem 0 1rem 0;
            align-self: flex-start;
            button {
              padding: 0.6rem 1.5rem;
              letter-spacing: 0.15rem;
            }
          }
        }
      }
    }
  }
`;

const ContactPage = () => {
  const topBarTitle = 'Contact';

  //---------------------------
  const form = useRef();
  const [sent, setSent] = useState(false);

  const sendEmail = e => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_YOUR_SERVICE_ID,
        process.env.NEXT_PUBLIC_YOUR_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_YOUR_USER_ID
      )
      .then(
        result => {
          console.log(result.text);
        },
        error => {
          console.log(error.text);
        },
        e.target.reset(),
        setSent(true),
        setTimeout(() => {
          setSent(false);
        }, 4000)
      );
  };
  //---------------------------
  return (
    <ContactStyle>
      <MenuList />
      <div className="mainContactSection">
        <TopBar title={topBarTitle} />

        <div className="contactSection">
          <div className="sectionTitle">
            <h3>Contact Us</h3>
          </div>
          <div className="formAndInfo">
            <div className="formWrap">
              <form ref={form} onSubmit={sendEmail} className="theForm">
                <p>
                  <label>Enter your Name</label>
                  <input type="text" name="name" minLength="3" required />
                </p>
                <p>
                  <label>Email address</label>
                  <input type="email" name="email" minLength="7" required />
                </p>
                <p>
                  <label>Message Subject</label>
                  <input
                    type="text"
                    name="subject"
                    minLength="2"
                    maxLength="35"
                    required
                  />
                </p>
                <p>
                  <label>Enter your Message</label>
                  <textarea
                    name="message"
                    minLength="5"
                    maxLength="200"
                    required
                    rows="7"
                    cols="40"
                  />
                </p>
                <div className="btn">
                  <button>Submit</button>
                  {sent && <span className="sentSpan">Message sent!</span>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ContactStyle>
  );
};

export default ContactPage;
