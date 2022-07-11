import Link from 'next/link';
import styled from 'styled-components';
import { useUser } from '@auth0/nextjs-auth0';

const StyledConfirmation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .formWrapper {
    margin-top: 10vh;
    text-align: center;
    width: auto;
    border-radius: 5px;
    .topbarSection {
      border-radius: 6px 6px 0 0;
      background-color: #004695;
      .columnTitle {
        margin: 0 7%;

        h3 {
          color: #dfe6ed;
          margin: 0;
          padding: 0.42rem 0;
          font-weight: 400;
          text-align: center;
        }
      }
    }

    .backColor {
      background-color: #d1dfed;
      /* background-color: orange; */
      .theMessage {
        margin: 0 1rem;
      }

      h3 {
        margin: 0;
        padding: 1.17rem;
        :first-child {
          padding-bottom: 0;
        }
      }
      hr {
        border-top: 1px solid #7c90a6;
      }
    }
    .buttons {
      margin-top: 1.245rem;
      display: flex;
      justify-content: space-between;
      .no {
        button {
          background-color: #e05539;
        }

        button:hover {
          background-color: #ff6b4d;
        }
      }
    }
  }
`;

const Login = () => {
  const { user } = useUser();
  if (!user) {
    return (
      <StyledConfirmation>
        <div className="formWrapper">
          <div className="topbarSection">
            <div className="columnTitle">
              <h3>Please confirm</h3>
            </div>
          </div>
          <div className="backColor">
            <div className="theMessage">
              <h3>By siging up you agree to receive</h3>
              <h3>montly newsletters from us</h3>
            </div>
            <hr />
          </div>
          <div className="buttons">
            <div className="btn">
              <button>
                <Link href="/api/auth/login">Yes, login</Link>
              </button>
            </div>
            <div className="btn no">
              <button>
                <Link href="/">No, go back</Link>
              </button>
            </div>
          </div>
        </div>
      </StyledConfirmation>
    );
  }
};

export default Login;
