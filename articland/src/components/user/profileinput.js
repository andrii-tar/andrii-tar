import React from 'react';
import { useContext } from 'react';

export default function ProfileInput(props) {

    const ProfileCtx = useContext(props.ProfileContext);

    return (
        <>
            <div class="input-form__inputContainer">
                <input type="text"
                    value={ProfileCtx.email}
                    onChange={(e) => ProfileCtx.setEmail(e.target.value)}
                    class="input" placeholder="Email" required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Characters followed by an @ sign, followed by more characters, and then at least 2 letters from a to z after the '.' sign"
                    />
            </div>

            <div class="input-form__inputContainer">
                <input type="text"
                    value={ProfileCtx.username}
                    onChange={(e) => ProfileCtx.setUsername(e.target.value)}
                    class="input" placeholder="Username" required/>
            </div>

            <div class="input-form__inputContainer">
                <input type="password" class="input" placeholder="Password"
                    value={ProfileCtx.password}
                    onChange={(e) => ProfileCtx.setPassword(e.target.value)}
                    required
                    pattern=".{8,}" title="Eight or more characters"

                />
            </div>

            <div class="input-form__inputContainer">
                <input type="password" class="input" placeholder="Confirm password"
                    value={ProfileCtx.confpassword}
                    onChange={(e) => ProfileCtx.setConfPassword(e.target.value)}
                    required
                    pattern=".{8,}" title="Eight or more characters"

                />
            </div>
            <div class="select-role">
                <select name="role_id"
                    value={ProfileCtx.role}
                    onChange={(e) => ProfileCtx.setRole(e.target.value)}
                    
                >
                    <option value="1">User</option>
                    <option value="2">Moderator</option>
                </select>
            </div>
        </>
    )
}

