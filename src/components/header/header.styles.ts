import styled, { css } from "styled-components";

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      display: flex;
      gap: 0.5rem;

      a {
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${theme["gray-100"]};
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;

        &:hover {
          border-bottom: 3px solid ${theme["green-500"]};
        }

        &.active {
          color: ${theme["green-500"]};
        }
      }
    }
  `}
`;
